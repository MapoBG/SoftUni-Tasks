import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import * as gameServices from './services/gameServices';
import { Catalog } from './components/catalog/Catalog';
import { Header } from './components/common/Header';
import { Create } from './components/create/Create';
import { Home } from './components/home/Home';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { GameDetails } from './components/details/GameDetails';

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    gameServices.getAll()
      .then(result => setGames(result))
  }, [])
  return (
    <div id="box">
      <Header />
      <main id='main-component'>
        <Routes>
          <Route path='/' element={<Home games={games} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create-game' element={<Create />} />
          <Route path='/games-catalog' element={<Catalog games={games} />} />
          <Route path='/details/:gameId' element={<GameDetails games={games} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
