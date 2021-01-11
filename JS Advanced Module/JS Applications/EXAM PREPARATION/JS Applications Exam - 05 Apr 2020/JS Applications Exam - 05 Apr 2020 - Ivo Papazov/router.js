import { render } from "./node_modules/lit-html/lit-html.js";

import layout from "./templates/layout.js";
import home from "./templates/home.js";
import login from "./templates/login.js";

const routes = [
    {
        path: "/",
        template: home,
    },
    {
        path: "/home",
        template: home,
    },
    {
        path: "/login",
        template: login,
    },
];

export const router = (path) => {
    history.pushState({}, "", path);

    const route = routes.find(r => r.path == path);

    if (!route) {
        render(layout(home(), { navigationHandler }), document.getElementById("root"));
        return;
    }

    render(layout(route.template(), { navigationHandler }), document.getElementById("root"));
}

function navigationHandler(e) {
    if (!e.target == "A") {
        return;
    }

    e.preventDefault();

    let url = new URL(e.target.href);

    router(url.pathname);
}