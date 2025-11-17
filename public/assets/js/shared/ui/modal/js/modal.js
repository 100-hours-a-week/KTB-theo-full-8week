import { activeCommonCss } from "../../../lib/dom.js";
import { cssPath } from "../../../path/cssPath.js";

activeCommonCss(cssPath.COMMON_MODAL_CSS_PATH);

export function modal(modalLogic) {
    const root = document.createElement('div');
    root.className = 'modal-container';
    root.innerHTML =
        `
        <div class="modal-wrapper">
            <h2 class="modal-title">${modalLogic.title}</h2>
            <p class="modal-detail">${modalLogic.detail}</p>
            <button id="modal-cancel-btn" class="modal-btn">취소</button>
            <button id="modal-confirm-btn" class="modal-btn">확인</button>
        </div>
        `;

    const cancelButton = root.querySelector('#modal-cancel-btn');
    const confirmButton = root.querySelector('#modal-confirm-btn');

    // 모달창 취소버튼 클릭 시 로직
    cancelButton.addEventListener('click', () => {
        modalLogic.cancelLogic();
        root.remove();
    })

    // 모달창 확인버튼 클릭 시 로직
    confirmButton.addEventListener('click', () => {
        modalLogic.confirmLogic();
        root.remove();
    })

    return root;
}