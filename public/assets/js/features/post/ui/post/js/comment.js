import { activeFeatureCss } from "../../../../../shared/lib/dom.js";
import { cssPath } from "../../../../../shared/path/cssPath.js";
import { apiPath } from "../../../../../shared/path/apiPath.js";

activeFeatureCss(cssPath.COMMENT_CSS_PATH);

export function comment(commentData) {
    console.log("render");
    const { id, authorId, authorNickname, authorProfileImage, updatedAt, content } = commentData;
    const root = document.createElement('div');
    root.className = 'comment-container';
    root.id = `comment-${id}`;
    root.innerHTML =
        `
        <div class="comment-wrapper">
            <div class="comment-author-profile-field ${authorId}">
                <img id="comment-author-profile-image"
                ${authorProfileImage ? `src="${apiPath.PROFILE_IMAGE_STORATE_URL + authorProfileImage}"` : ''}>
            </div>
            <div class="comment-main">
                <div class="comment-author-field">
                    <label class="comment-author-nickname">${authorNickname}</label>
                    <label class="comment-updatedat">${updatedAt}</label>
                </div>
                <div class="comment-content-field">
                    <p class="comment-content">${content}</p>
                </div>
            </div>
            <div class="comment-control-field">
                <button id="comment-update-btn" class="comment-control-btn">수정</button>
                <button id="comment-delete-btn" class="comment-control-btn">삭제</button>
            </div>
        </div>
        `;
    return root;
}