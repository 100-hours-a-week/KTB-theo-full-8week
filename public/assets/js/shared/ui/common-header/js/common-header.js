import { activeCommonCss } from "../../../lib/dom.js";
import { cssPath } from "../../../path/cssPath.js";
import { apiPath } from "../../../path/apiPath.js";
import { goBack, navigate } from "../../../lib/router.js";
import { eventBus } from "../../../lib/eventBus.js";

activeCommonCss(cssPath.COMMON_HEADER_CSS_PATH);

export function commonHeader() {
    const root = document.createElement('div');
    root.className = "common-header-container";
    root.innerHTML =
        `<div class="common-header-container">
            <div class="common-header-wrapper">
                <div class="common-header-left">
                    <button id="common-back-btn">&lt;</button>
                </div>
                <div class="common-header-center">아무 말 대잔치</div>
                <div class="common-header-right">
                    <div class="profile-trigger">
                        <button id="common-header-profile-btn">
                            <img id="common-header-userprofile">
                        </button>
                        <div class="common-header-profile-menu hide" hidden >
                            <button class="header-profile-menu-btn" data-action="edit-profile">회원정보 수정</button>
                            <button class="header-profile-menu-btn" data-action="edit-password">비밀번호 수정</button>
                            <button class="header-profile-menu-btn"  data-action="logout">로그아웃</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    const menu = root.querySelector('.common-header-profile-menu');
    const backButton = root.querySelector('#common-back-btn');
    const profileButton = root.querySelector('#common-header-profile-btn');
    const profileImage = root.querySelector('#common-header-userprofile');
    updateProfileImage();

    // 돌아가기 버튼 이벤트 등록
    backButton.addEventListener('click', () => {
        goBack();
    })

    // 프로필 이미지 버튼 이벤트 등록
    profileButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleProfileMenu();
    })

    // 드롭다운 메뉴 클릭 이벤트 등록
    menu.addEventListener('click', (event) => {
        const action = event.target.dataset.action;
        doButtonAction(action);
    })

    // 전체 화면 클릭 이벤트 등록
    document.addEventListener('click', (event) => {
        if (!root.contains(event.target)) {
            menu.hidden = true;
        }
    })

    // 로그인 시 프로필 이미지 변경 커스텀 이벤트 등록
    eventBus.addEventListener('user:login', (event, options) => {
        updateProfileImage();
        showProfileMenu();
    })

    eventBus.addEventListener('user:editProfile', (event, options) => {
        updateProfileImage();
    })

    eventBus.addEventListener('user:logout', (event, options) => {
        updateProfileImage();
        hideProfileMenu();
    })

    // 헤더 프로필 로컬 스토리지 기반 이미지 업데이트
    function updateProfileImage() {
        profileImage.src = apiPath.PROFILE_IMAGE_STORATE_URL + localStorage.getItem('profileImage');
    }

    // 로그아웃 시 드롭다운 메뉴 숨기기
    function hideProfileMenu() {
        menu.classList.add('hide');
    }

    // 로그인 시 드롭다운 메뉴 보이기
    function showProfileMenu() {
        menu.classList.remove('hide');
    }


    // 드롭다운 메뉴 토들 핸들러
    function toggleProfileMenu() {
        const open = menu.hidden;
        menu.hidden = !open;
    }

    // 드롭다운 메뉴 닫기 핸들러
    function closeMenu() {
        menu.hidden = true;
    }

    // 드롭다운 메뉴 선택시 액션 핸들러
    function doButtonAction(action) {
        if (!action) {
            return;
        }

        switch (action) {
            case "edit-profile":
                navigate('/editProfile');
                break;
            case "edit-password":
                navigate('/editPassword');
                break;
            case "logout":
                navigate('/logout');
                break;
        }
        closeMenu();
    }
    return root;

}