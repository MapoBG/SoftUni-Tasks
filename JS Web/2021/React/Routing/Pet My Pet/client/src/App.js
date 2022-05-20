import { Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Catalog from './components/Catalog/Catalog';
import PetDetails from './components/Catalog/PetDetails';
import AddPet from './components/Catalog/AddPet';
import PetEdit from './components/Catalog/PetEdit';

import './App.css';
import DemoComponent from './DemoComponent';

function App() {
  return (
    <div id="container">
      <Header />

      <main id="site-content">
        <Switch>
          <Route path="/" component={Welcome} exact />
          <Route path="/catalog" component={Catalog} exact />
          <Route path="/catalog/add-pet" component={AddPet} exact />
          <Route path="/catalog/:category" component={Catalog} exact />
          <Route path="/catalog/details/:petId" exact component={PetDetails} />
          <Route path="/catalog/edit/:petId" component={PetEdit} />
          <Route path="/demo" component={DemoComponent} />
        </Switch>
      </main>

      <Footer />
    </div>
  );
}

export default App;
