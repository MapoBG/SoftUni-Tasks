import { Routes, Route } from 'react-router-dom';
// import './App.css';
import './scss/App.scss';
import { Home } from './components/home/Home';
import Footer from './components/common/Footer';
import Header from './components/common/Header';



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
