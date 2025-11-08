import { activeCommonCss } from "./lib/dom.js";
const HEADER_CSS_PATH = '/header.css'

activeCommonCss(HEADER_CSS_PATH);

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
                    <img id="common-header-userprofile" src="../public/assets/img/noneProfile.png">
                </div>
            </div>
        </div>`;

    return root;
}