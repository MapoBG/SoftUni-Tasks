import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// import './App.css';
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


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, currentUser => {
      setUser(currentUser);
    })
  }, []);

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, navigateToHome }}>
      <div className="App">
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/game-details/:gameId' element={<GameDetails />} />
          <Route path='/user-library/:userId' element={<UserLibrary />} />
        </Routes>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;