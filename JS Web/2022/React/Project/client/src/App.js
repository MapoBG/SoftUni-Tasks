import { Routes, Route } from 'react-router-dom';
// import './App.css';
import './scss/App.scss';
import { Home } from './components/home/Home';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import GameDetails from './components/game-details/GameDetails';



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/game-details/:gameId' element={<GameDetails />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
