import { activeCommonCss } from "./lib/dom.js";
import { cssPath } from "./path/cssPath.js";
import { goBack, navigate } from "./lib/router.js";

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
                            <img id="common-header-userprofile" src="../public/assets/img/noneProfile.png">
                        </button>
                        <div class="common-header-profile-menu">
                            <button class="header-profile-menu-btn" data-action="edit-profile">회원정보 수정</button>
                            <button class="header-profile-menu-btn" data-action="edit-password">비밀번호 수정</button>
                            <button class="header-profile-menu-btn"  data-action="logout">로그아웃</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    const menu = root.querySelector('.common-header-profile-menu');
    const menuButton = root.querySelectorAll('.header-profile-menu-btn');
    const backButton = root.querySelector('#common-back-btn');
    const profileButton = root.querySelector('#common-header-profile-btn');

    backButton.addEventListener('click', () => {
        goBack();
    })


    profileButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleProfileMenu();
    })

    menu.addEventListener('click', (event) => {
        const action = event.target.dataset.action;
        doButtonAction(action);
    })

    document.addEventListener('click', (event) => {
        if (!root.contains(event.target)) {
            menu.hidden = true;
        }
    })
    function toggleProfileMenu() {
        const open = menu.hidden;
        menu.hidden = !open;
    }

    function closeMenu() {
        menu.hidden = true;
    }
    function doButtonAction(action) {
        if (!action) {
            return;
        }

        switch (action) {
            case "edit-profile":
                navigate('/edit-profile');
                break;
            case "edit-password":
                navigate('/edit-password');
                break;
            case "logout":
                navigate('/');
                break;
        }
        closeMenu();
    }
    return root;

}