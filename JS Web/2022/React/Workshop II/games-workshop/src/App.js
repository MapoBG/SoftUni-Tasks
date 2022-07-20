import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Catalog } from './components/catalog/Catalog';
import { Header } from './components/common/Header';
import { Create } from './components/create/Create';
import { Home } from './components/home/Home';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';

function App() {
  return (
    <div id="box">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create-game' element={<Create />} />
        <Route path='/games-catalog' element={<Catalog />} />
      </Routes>
    </div>
  );
}

export default App;
