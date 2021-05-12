import { Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Welcome from './components/Welcome';

import './App.css';
import Catalog from './components/Catalog/Catalog';
import PetDetails from './components/Catalog/PetDetails';

function App() {
  return (
    <div id="container">
      <Header />

      <main id="site-content">
        <Switch>
          <Route path="/" component={Welcome} exact/>
          <Route path="/catalog" component={Catalog} exact/>
          <Route path="/catalog/:category" component={Catalog} />
          <Route path="/pets/details/:petId" component={PetDetails} />
        </Switch>
      </main>

      <Footer />
    </div>
  );
}

export default App;
