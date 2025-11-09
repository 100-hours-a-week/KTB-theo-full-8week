import { activeFeatureCss } from "../../../shared/lib/dom.js";
import { Api } from "../../../shared/lib/api.js";
import { navigate } from "../../../shared/lib/router.js";

// CSS Path
const SIGNUP_CSS_PATH = '/user/ui/signup.css'

// 유틸 정규 표현식
const EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,20}$/;


// API 요청 URL
const NICKNAME_DOUBLE_CHECK_URL = '/user/nickname/double-check';

activeFeatureCss(SIGNUP_CSS_PATH);

export function signUp() {
    const root = document.createElement('div');
    root.className = "signup-form-container"
    root.innerHTML =
        `
        <div class="signup-form-wrapper">
            <h2>회원가입</h2>
            <form id="signup-form">
                <div class="signup-field signup-profile-field">
                    <label class="signup-label" for="signup-form-profile-image">프로필 사진</label>
                    <p class="signup-form-helper-text helper-profile-image"></p>
                    <input id="signup-form-profile-image" type="file" accept="image/*">
                    <button id="signup-image-upload-btn" type="button">+</button>
                </div>
                <div class="signup-field">
                    <label class="signup-label" for="signup-form-email">이메일*</label>
                    <input id="signup-form-email" name="email" type="email" class="signup-input" required
                        placeholder="이메일을 입력하세요">
                    <p class="signup-form-helper-text helper-email"></p>
                </div>
                <div class="signup-field">
                    <label class="signup-label" for="signup-form-password">비밀번호*</label>
                    <input id="signup-form-password" name="password" type="password" class="signup-input" required
                        placeholder="비밀번호를 입력하세요">
                    <p class="signup-form-helper-text helper-password"></p>
                </div>
                <div class="signup-field">
                    <label class="signup-label" for="signup-form-password-confirm">비밀번호 확인*</label>
                    <input id="signup-form-password-confirm" name="password" type="password" class="signup-input"
                        required placeholder="비밀번호를 한 번 더 입력하세요">
                    <p class="signup-form-helper-text helper-password-confirm"></p>
                </div>
                <div class="signup-field">
                    <label class="signup-label" for="signup-form-nickname">닉네임*</label>
                    <input id="signup-form-nickname" name="nickname" type="text" class="signup-input" required
                        placeholder="닉네임을 입력하세요">
                    <p class="signup-form-helper-text helper-nickname"></p>
                </div>
                <button id="signup-btn" type="submit" disabled>회원가입</button>
            </form>
            <a id="signup-to-login-link" href="/login">로그인하러 가기</a>
        </div>
    `

    const form = root.querySelector('#signup-form');
    const profileImageInput = root.querySelector('#signup-form-profile-image');
    const profileImageUploadButton = root.querySelector('#signup-image-upload-btn');
    const emailInput = root.querySelector('#signup-form-email');
    const passwordInput = root.querySelector('#signup-form-password');
    const passwordConfirmInput = root.querySelector('#signup-form-password-confirm');
    const nicknameInput = root.querySelector('#signup-form-nickname');
    const signupButton = root.querySelector('#signup-btn');
    const loginLink = root.querySelector('#signup-to-login-link');
    const helperTexts = {};

    root.querySelectorAll('.signup-form-helper-text')
        .forEach((elemenet) => {
            const helperClass = Array.from(elemenet.classList)
                .find(cls => cls.startsWith('helper-'));

            if (helperClass) {
                const key = helperClass.replace('helper-', '');
                helperTexts[key] = elemenet;
            }
        });

    let isAvailableNickname = false;

    // 회원가입 폼 이벤트 등록
    form.addEventListener('submit', () => {

    })

    // 회원 프로필 이미지 업로드 버튼 이벤트 등록
    profileImageUploadButton.addEventListener('click', () => {
        profileImageInput.click();
    })

    // 회원 프로필 이미지 input 태그 이벤트 등록
    profileImageInput.addEventListener('change', () => {
        const file = profileImageInput.files[0];
        console.log(file.path)
        profileImageUploadButton.classList.remove('upload');
        if (!file) {
            profileImageUploadButton.innerHTML = '+';
            helperTexts['profile-image'].textContent = '';
            return;
        }

        if (!file.type.startsWith('image/')) {
            profileImageUploadButton.innerHTML = '+';
            helperTexts['profile-image'].textContent = '이미지 파일만 업로드 가능합니다.'
        }

        helperTexts['profile-image'].textContent = '';

        const url = URL.createObjectURL(file);
        profileImageUploadButton.classList.add('upload');
        profileImageUploadButton.innerHTML =
            `
                <img id="sign-form-preview" src="${url}"/>
            `;
    })
    // 이메일 이벤트 등록
    emailInput.addEventListener('input', () => {
        handleInvalidEmail();
        activeSignUpButton();
    })

    //패스워드 이벤트 등록
    passwordInput.addEventListener('input', () => {
        handleInvalidPassword();
        handleEqualPasswordInput()
        activeSignUpButton();
    })

    // 패스워드 확인 input 태그 이벤트 등록
    passwordConfirmInput.addEventListener('input', () => {
        handleEqualPasswordInput()
        activeSignUpButton();
    })

    // 닉네임 input 태그 이벤트 등록(input)
    nicknameInput.addEventListener('input', () => {
        handleInvalidNicknamePattern();
        isAvailableNickname = false;
        activeSignUpButton();
    })

    loginLink.addEventListener('click', (event) => {
        event.preventDefault();
        navigate('/login');
    })
    //  닉네임 input 태그 이벤트 등록(blur)
    nicknameInput.addEventListener('blur', async () => {
        // 닉네임 유효성 검증 완료해야 중복 검사API 요청
        const isValidNickname = handleInvalidNicknamePattern();
        if (!isValidNickname) {
            return;
        }
        isAvailableNickname = await handleNicknameDuplication();
        activeSignUpButton();
    })

    function activeSignUpButton() {
        const email = String(emailInput.value).trim();
        const password = String(passwordInput.value).trim();
        const passwordConfirm = String(passwordConfirmInput.value).trim();
        const nickname = String(nicknameInput.value).trim();

        const isFilled = email && password && passwordConfirm && nickname;

        if (!isFilled) {
            signupButton.classList.remove('active');
            signupButton.disabled = true;
            return;
        }

        const isEmailValid = handleInvalidEmail();
        const isPassowordValid = handleInvalidPassword();
        const isEqualPassword = handleEqualPasswordInput();
        const isNicknamePatternValid = handleInvalidNicknamePattern();

        const canActive = isEmailValid && isPassowordValid && isEqualPassword && isNicknamePatternValid && isAvailableNickname;
        signupButton.classList.toggle('active', canActive);
        signupButton.disabled = !canActive;
    }
    // 닉네임 유효성 검증 핸들러
    function handleInvalidNicknamePattern() {
        const nickname = String(nicknameInput.value);

        if (!nickname) {
            helperTexts['nickname'].textContent = '닉네임을 입력해주세요'
            return false;
        }
        if (nickname.trim().length > 10) {
            helperTexts['nickname'].textContent = '닉네임을 최대 10자까지 작성 가능합니다.'
            return false;
        }
        if (nickname.includes(' ')) {
            helperTexts['nickname'].textContent = '띄워쓰기를 없애주세요'
            return false;
        }

        helperTexts['nickname'].textContent = ''
        return true;
    }

    // 닉네임 중복 검증 핸들러
    async function handleNicknameDuplication() {
        console.log("send api")
        const nickname = String(nicknameInput.value).trim();

        const response = await requestNicknameDuplication(nickname);
        const responseBody = response.data;
        const isAvailable = responseBody.available;

        if (!isAvailable) {
            helperTexts['nickname'].textContent = '중복된 닉네임입니다.'
            return false;
        }

        helperTexts['nickname'].textContent = ''
        return true;
    }

    // 닉네임 중복 검사 요청 API
    async function requestNicknameDuplication(nickname) {
        const respose = await new Api()
            .post()
            .url(NICKNAME_DOUBLE_CHECK_URL)
            .body({
                nickname: nickname
            })
            .request();

        return respose;
    }

    // 비밀번호와 비밀번호 확인 입력이 같은 지 검증
    function handleEqualPasswordInput() {
        const password = String(passwordInput.value).trim();
        const passwordConfirm = String(passwordConfirmInput.value).trim();

        if (!passwordConfirm) {
            helperTexts['password-confirm'].textContent = '비밀번호를 한 번 더 입력해주세요.'
            return false;
        }

        if (password !== passwordConfirm) {
            helperTexts['password-confirm'].textContent = '비밀번호가 다릅니다.'
            return false;
        } else {
            helperTexts['password-confirm'].textContent = ''
        }
        return true;
    }

    // 이메일 유효성 검증 핸들러
    function handleInvalidEmail() {
        const email = String(emailInput.value);
        if (!email) {
            helperTexts['email'].textContent = '이메일을 입력해주세요';
            return false;
        }
        if (!isEmail(email.trim())) {
            helperTexts['email'].innerHTML = '올바른 이메일 주소 형식을 입력해주세요. example@example.com'
            return false;
        } else {
            helperTexts['email'].textContent = '';
        }
        return true;
    }

    // 패스워드 유효성 검증 핸들러
    function handleInvalidPassword() {
        const password = String(passwordInput.value);
        if (!password) {
            helperTexts['password'].textContent = '비밀번호를 입력해주세요';
            return false;
        }
        if (!isValidPassword(password.trim())) {
            helperTexts['password'].textContent = '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개 포함해야 합니다.';
            return false;
        } else {
            helperTexts['password'].textContent = '';
        };

        return true;
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