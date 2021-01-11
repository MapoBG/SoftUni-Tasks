import { Router } from 'https://unpkg.com/@vaadin/router';
import { Home } from './components/home.js';
import { Register } from './components/register.js';

customElements.define("home-component", Home);
customElements.define("register-component", Register);

const rootEl = document.getElementById("root");
const router = new Router(rootEl);

router.setRoutes([
    {
        path: "/",
        component: "home-component"
    },
    {
        path: "/register",
        component: "register-component"
    }
]);