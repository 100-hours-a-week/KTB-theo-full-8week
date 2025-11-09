import { login } from "../../features/auth/ui/login.js"
import { signUp } from "../../features/user/ui/signup.js"

const routes = [
    { path: "/", render: login },
    { path: "/login", render: login },
    { path: "/signup", render: signUp }
]

function findRoute(pathname) {
    return routes.find((route) => route.path === pathname) || routes[0];
}

export function renderRoute(path) {
    const render = findRoute(path).render;
    const root = document.getElementById("app");

    root.innerHTML = '';
    const component = render();
    root.appendChild(component);
}

export function navigate(path) {
    renderRoute(path);
}