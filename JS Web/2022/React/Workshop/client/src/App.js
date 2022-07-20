import './App.css';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { Main } from './components/main/Main';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AddEditUser } from './components/main/user/AddEditUser';


function App() {
  let location = useLocation();
  let state = { backgroundLocation: Location }
  console.log(state);

  return (
    <div className="App">
      <Header />

      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<Main />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/create" element={<AddEditUser />} />
        </Routes>
      )}

      <Footer />
    </div>
  );
}

export default App;