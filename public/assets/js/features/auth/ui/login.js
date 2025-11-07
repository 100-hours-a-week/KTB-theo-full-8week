import { activeCss } from "../../../shared/lib/dom.js";

const LOGIN_CSS_PATH = '/auth/ui/login.css';
const EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,20}$/;

activeCss(LOGIN_CSS_PATH);

export function login() {
    const root = document.createElement("div");
    root.className = "login-container";
    root.innerHTML =
        `<div class="login-wrapper">
            <h2>로그인</h2>
            <div>
                <form method="post" action="" id="login-form">
                    <div class="login-field">
                        <label class="login-label" for="email">이메일</label>
                        <input id="email" name="email" type="email" class="login-input" 
                        required placeholder="이메일을 입력하세요"/>
                    </div>
                    <div class="login-field">
                        <label class="login-label" for="password">비밀번호</label>
                        <input id="password" name="password" type="password" class="login-input" 
                        required placeholder="비밀번호를 입력하세요"/>
                    </div>
                    <p id="helper-text"></p>
                    <button id="login-btn" type="submit" disabled>로그인</button>
                </form>
                <a id="signup" href="/signup"> 회원가입</a>
            </div>
        </div>`;

    const form = root.querySelector('#login-form');
    const email = root.querySelector('#email');
    const password = root.querySelector('#password');
    const loginButton = root.querySelector('#login-btn');
    const helperText = root.querySelector('#helper-text');

    function activeLoginButton() {
        const loginEmail = String(email.value).trim();
        const loginPassword = String(password.value).trim();
        const isFilled = loginEmail && loginPassword;

        if (!isFilled) {
            loginButton.classList.remove('active');
            loginButton.disabled = true;
            return;
        }

        const canActive = isEmail(loginEmail) && isValidPassword(loginPassword);
        loginButton.classList.toggle('active', canActive);
    }

    function isEmail(email) {
        return Boolean(EMAIL_REGEX.test(email));
    }

    function isValidPassword(password) {
        return Boolean(PASSWORD_REGEX.test(password));
    }

    function handleInvalidEmail() {
        const toValid = String(email.value).trim();
        if (!toValid) {
            helperText.textContent = '이메일을 입력해주세요';
            return;
        }
        if (!isEmail(toValid)) {
            helperText.innerHTML = '올바른 이메일 주소 형식을 입력해주세요. example@example.com'
        } else {
            helperText.textContent = '';
        }
    }

    function handleInvalidPassword() {
        const toValid = String(password.value).trim();
        if (!toValid) {
            helperText.textContent = '비밀번호를 입력해주세요';
            return;
        }
        if (!isValidPassword(toValid)) {
            helperText.textContent = '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        } else {
            helperText.textContent = '';
        };
    }

    function handleLoginFail() {

    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLoginFail();
    })

    email.addEventListener('input', () => {
        handleInvalidEmail();
        activeLoginButton();
    });
    password.addEventListener('input', () => {
        handleInvalidPassword();
        activeLoginButton();
    });


    return root;
}
