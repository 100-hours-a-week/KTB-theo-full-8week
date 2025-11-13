import { login } from "../../features/auth/ui/login/js/login.js"
import { logout } from "../../features/auth/ui/logout/js/logout.js";
import { signup } from "../../features/user/ui/signup/js/signup.js";
import { postCardList } from "../../features/post/ui/posts/js/postCardList.js";
import { makePost } from "../../features/post/ui/makePost/js/makePost.js";
import { editProfile } from "../../features/user/ui/editprofile/js/editProfile.js";
import { post } from "../../features/post/ui/post/js/post.js";

let history = ['/'];

const routes = [
    { path: "/", render: login },
    { path: "/login", render: login },
    { path: "/logout", render: logout },
    { path: "/signup", render: signup },
    { path: "/post", render: postCardList },
    { path: "/makepost", render: makePost },
    { path: "/editProfile", render: editProfile }
]

// 경로 들어오면 배열에서 Path값 비교해서 맞는 라우터 찾고 없으면 시작 페이지로 이동
function findRoute(pathname) {
    return routes.find((route) => route.path === pathname) || routes[0];
}

export async function renderRoute(path) {
    const render = findRoute(path).render;
    const root = document.getElementById("app");
    root.innerHTML = '';
    const component = await render();
    root.appendChild(component);
}

export function navigate(path) {
    renderRoute(path);
    history.push(path);
    console.log(history);
}

export function canGoBack() {
    return history.length > 1;
}

export function goBack() {
    if (!canGoBack()) {
        navigate('/');
        return;
    }
    console.log(history);
    history.pop();
    const previousPath = history[history.length - 1];
    renderRoute(previousPath);
}

export function clearPathHistory() {
    history = [];
    history.push('/');
}