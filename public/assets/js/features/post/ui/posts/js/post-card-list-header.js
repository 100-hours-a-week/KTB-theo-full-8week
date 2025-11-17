import { activeFeatureCss } from "../../../../../shared/lib/dom.js";
import { cssPath } from "../../../../../shared/path/cssPath.js";
import { navigate } from "../../../../../shared/lib/router.js";

activeFeatureCss(cssPath.POST_CARD_LIST_HEADER_CSS_PATH);

export function postCardListHeader() {
    const root = document.createElement('div');
    root.className = 'post-card-list-header';
    root.innerHTML =
        `
        <div class="post-card-title-box">
            <p>안녕하세요,<br> 아무 말 대잔치 <strong>게시판</strong>입니다.</p>
            <button id="post-card-create-btn">게시글 작성</button>
        </div>
        `

    const postCreateButton = root.querySelector('#post-card-create-btn');

    // 게시글 작성 버튼 클릭시, 게시글 작성 페이지로 이동
    postCreateButton.addEventListener('click', (event) => {
        event.preventDefault();
        navigate('/makepost');
    })

    return root;
}