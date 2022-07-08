import './App.css';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { Main } from './components/main/Main';


function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;