import { activeFeatureCss } from "../../../../../shared/lib/dom.js";
import { cssPath } from "../../../../../shared/path/cssPath.js";

activeFeatureCss(cssPath.COMMENT_CARD_LIST_CSS_PATH);

export function commentCardList() {
    const root = document.createElement('div');
    root.className = 'comment-card-list-container';
    root.innerHTML =
        `
         <div class="comment-card-list-wrapper">
            <form id="comment-form">
            <div class="comment-field">
                <textarea id="comment-form-content" placeholder="댓글을 남겨주세요!"></textarea>
                <button id="comment-create-btn" type="submit" disabled>댓글 등록</button>
            </div>
            </form>
        </div>
        `
    return root;
}