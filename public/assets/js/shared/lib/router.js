import { login } from "../../features/auth/ui/login.js"
import { signup } from "../../features/user/ui/signup.js"
import { postCardList } from "../../features/post/ui/postCardList.js";

const history = [];

const routes = [
    { path: "/", render: login },
    { path: "/login", render: login },
    { path: "/signup", render: signup },
    { path: "/post", render: postCardList }
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
    history.push(path);
}

export function goBack() {
    if (history.length == 0) {
        navigate('/login');
        return;
    }

    history.pop();
    const previousPath = history[history.length - 1];
    renderRoute(previousPath);
}