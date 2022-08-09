import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/App.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './api/firebase';
import { AuthContext } from './contexts/authContext';
import { Home } from './components/home/Home';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import { Login } from './components/users/login/Login';
import { Register } from './components/users/register/Register';
import GameDetails from './components/game-details/GameDetails';
import { Logout } from './components/users/logout/Logout';
import UserLibrary from './components/user-library/UserLibrary';
import { NotFound } from './components/common/NotFound';
import { PrivateRoute } from './components/common/PrivateRoute';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, currentUser => {
      setUser(currentUser);
    })
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      <div className="App">
        <Header />

        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='page=:pageNumber' element={<Home />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path='/logout' element={<Logout />} />
            <Route path='/user-library/:userId' element={<UserLibrary />} />
          </Route>
          <Route path='/game-details/:gameId' element={<GameDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;