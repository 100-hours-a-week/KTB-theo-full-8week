import { login } from "../../features/auth/ui/login/js/login.js"
import { signup } from "../../features/user/ui/signup/js/signup.js";
import { postCardList } from "../../features/post/ui/posts/js/postCardList.js";
import { makePost } from "../../features/post/ui/makePost/js/makePost.js";

const history = [];

const routes = [
    { path: "/", render: login },
    { path: "/login", render: login },
    { path: "/signup", render: signup },
    { path: "/post", render: postCardList },
    { path: "/makepost", render: makePost }
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

export function canGoBack() {
    return history.length > 1;
}

export function goBack() {
    if (!canGoBack()) {
        navigate('/login');
        return;
    }

    history.pop();
    const previousPath = history[history.length - 1];
    renderRoute(previousPath);
}