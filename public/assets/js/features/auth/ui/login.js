import { activeFeatureCss } from "../../../shared/lib/dom.js";
import { Api } from '../../../shared/lib/api.js';
import { ApiError } from "../../../shared/lib/api-error.js";

const LOGIN_CSS_PATH = '/auth/ui/login.css';
const EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,20}$/;

const LOGIN_API_URL = '/auth/access/token';

activeFeatureCss(LOGIN_CSS_PATH);

export function login() {
    const root = document.createElement("div");
    root.className = "login-container";
    root.innerHTML =
        `<div class="login-wrapper">
            <h2>로그인</h2>
            <div>
                <form id="login-form">
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
                    <button id="login-btn" type='submit' disabled>로그인</button>
                </form>
                <a id="signup" href="/signup"> 회원가입</a>
            </div>
        </div>`;

    const form = root.querySelector('#login-form');
    const email = root.querySelector('#email');
    const password = root.querySelector('#password');
    const loginButton = root.querySelector('#login-btn');
    const helperText = root.querySelector('#helper-text');

    // 이벤트 리스너 등록
    // 1. 로그인 폼 태그 이벤트 등록
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (loginButton.disabled) return;

        try {
            await loginRequest();
        } catch (error) {
            if (error instanceof ApiError) {
                handleLoginFail(error);
            }
        }

    })

    // 2. 이메일 이벤트 등록
    email.addEventListener('input', () => {
        handleInvalidEmail();
        activeLoginButton();
    });

    // 3. 패스워드 이벤트 등록
    password.addEventListener('input', () => {
        handleInvalidPassword();
        activeLoginButton();
    });


    // API 요청 함수
    // 1. 로그인 API 요청
    async function loginRequest() {
        loginButton.disabled = true;

        try {
            const response = await new Api()
                .post()
                .url(LOGIN_API_URL)
                .body({
                    email: email.value,
                    password: password.value
                })
                .request();

            return response;
        } finally {
            activeLoginButton();
        }
    }


    // 이벤트 리스너 콜백 함수
    // 1. 로그인 실패 핸들러
    function handleLoginFail(error) {
        helperText.textContent = error.message;
    }

    // 2. 로그인 버튼 활성화 검사 함수
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
        loginButton.disabled = !canActive;
    }

    // 3. 이메일 유효성 검증 핸들러
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

    // 4. 패스워드 유효성 검증 핸들러
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


    // 유틸 함수
    // 1. 이메일 패턴 정규식 검사
    function isEmail(email) {
        return Boolean(EMAIL_REGEX.test(email));
    }

    // 2. 패스워드 패턴 정규식 검사
    function isValidPassword(password) {
        return Boolean(PASSWORD_REGEX.test(password));
    }

    return root;
}
