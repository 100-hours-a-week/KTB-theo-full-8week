import { activeFeatureCss } from "../../../shared/lib/dom.js";
import { Api } from '../../../shared/lib/api.js';
import { ApiError } from "../../../shared/lib/api-error.js";
import { navigate } from "../../../shared/lib/router.js";

// CSS Path
const LOGIN_CSS_PATH = '/auth/ui/login.css';

// 유틸 정규 표현식
const EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,20}$/;

// API 요청 URL
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
                        <label class="login-label" for="login-form-email">이메일</label>
                        <input id="login-form-email" name="email" type="email" class="login-input" 
                        required placeholder="이메일을 입력하세요"/>
                    </div>
                    <div class="login-field">
                        <label class="login-label" for="login-form-password">비밀번호</label>
                        <input id="login-form-password" name="password" type="password" class="login-input" 
                        required placeholder="비밀번호를 입력하세요"/>
                    </div>
                    <p id="login-form-helper-text"></p>
                    <button id="login-btn" type='submit' disabled>로그인</button>
                </form>
                <a id="login-to-signup-link" href="/signup" class="router-link"> 회원가입</a>
            </div>
        </div>`;

    const form = root.querySelector('#login-form');
    const emailInput = root.querySelector('#login-form-email');
    const passwordInput = root.querySelector('#login-form-password');
    const loginButton = root.querySelector('#login-btn');
    const helperText = root.querySelector('#login-form-helper-text');
    const signUpLink = root.querySelector('#login-to-signup-link');

    // 이벤트 리스너 등록
    // 1. 로그인 폼 태그 이벤트 등록
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (loginButton.disabled) return;

        try {
            const response = await requestLogin();
            const responseBody = response.data;
            const isLoginSuccess = responseBody.loginSuccess;

            if (isLoginSuccess) {
                // TODO: 로그인 성공 시 게시글 목록화면으로 라우팅 처리 필요
                navigate('/post')
            }
        } catch (error) {
            if (error instanceof ApiError) {
                handleLoginFail(error);
            }
        }

    })

    // 2. 이메일 이벤트 등록
    emailInput.addEventListener('input', () => {
        handleInvalidEmail();
        activeLoginButton();
    });

    // 3. 패스워드 이벤트 등록
    passwordInput.addEventListener('input', () => {
        handleInvalidPassword();
        activeLoginButton();
    });

    // 4. 회원가입 페이지 이동 이벤트 등록
    signUpLink.addEventListener('click', (event) => {
        event.preventDefault();
        navigate('/signup');
    })

    // API 요청 함수
    // 1. 로그인 API 요청
    async function requestLogin() {
        loginButton.disabled = true;

        try {
            const response = await new Api()
                .post()
                .url(LOGIN_API_URL)
                .body({
                    email: emailInput.value,
                    password: passwordInput.value
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
        const email = String(emailInput.value).trim();
        const password = String(passwordInput.value).trim();
        const isFilled = email && password;

        if (!isFilled) {
            loginButton.classList.remove('active');
            loginButton.disabled = true;
            return;
        }

        const canActive = isEmail(email) && isValidPassword(password);
        loginButton.classList.toggle('active', canActive);
        loginButton.disabled = !canActive;
    }

    // 3. 이메일 유효성 검증 핸들러
    function handleInvalidEmail() {
        const email = String(emailInput.value);
        if (!email) {
            helperText.textContent = '이메일을 입력해주세요';
            return;
        }
        if (!isEmail(email.trim())) {
            helperText.textContent = '올바른 이메일 주소 형식을 입력해주세요. example@example.com';
        } else {
            helperText.textContent = '';
        }
    }

    // 4. 패스워드 유효성 검증 핸들러
    function handleInvalidPassword() {
        const password = String(passwordInput.value);
        if (!password) {
            helperText.textContent = '비밀번호를 입력해주세요';
            return;
        }
        if (!isValidPassword(password.trim())) {
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
