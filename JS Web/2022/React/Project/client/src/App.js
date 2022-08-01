import { Routes, Route } from 'react-router-dom';
// import './App.css';
import './scss/App.scss';
import { Home } from './components/home/Home';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import GameDetails from './components/game-details/GameDetails';



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/game-details/:gameId' element={<GameDetails />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
