import { activeCommonCss } from "./lib/dom.js";
import { cssPath } from "./path/cssPath.js";
import { goBack } from "./lib/router.js";

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
                    <button id="common-header-profile-btn">
                        <img id="common-header-userprofile" src="../public/assets/img/noneProfile.png">
                    </button>
                </div>
            </div>
        </div>`;


    const backButton = root.querySelector('#common-back-btn');
    backButton.addEventListener('click', () => {
        goBack();
    })

    const profileButton = root.querySelector('#common-header-profile-btn');
    profileButton.addEventListener('click', () => {
        console.log('click');
    })
    return root;

}