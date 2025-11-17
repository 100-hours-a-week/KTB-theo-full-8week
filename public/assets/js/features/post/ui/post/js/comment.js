import { activeFeatureCss } from "../../../../../shared/lib/dom.js";
import { cssPath } from "../../../../../shared/path/cssPath.js";
import { apiPath } from "../../../../../shared/path/apiPath.js";
import { Api } from "../../../../../shared/lib/api.js";
import { emit } from "../../../../../shared/lib/eventBus.js";

activeFeatureCss(cssPath.COMMENT_CSS_PATH);

export function comment(commentData, postId) {
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

    const commentUpdateButton = root.querySelector('#comment-update-btn');
    const commentDeleteButton = root.querySelector('#comment-delete-btn');
    const contentEl = root.querySelector('.comment-content');

    commentUpdateButton.addEventListener('click', () => {
        const currentContent = contentEl.textContent;
        emit('post:startEditComment', {
            commentId: id,
            content: currentContent,
            element: root,
        })
    })


    // 댓글 삭제 버튼 이벤트 등록
    commentDeleteButton.addEventListener('click', async () => {
        const response = await requestCommentDelete(postId, id);
        emit('post:deleteComment', { element: root });
    })


    // 댓글 삭제 API 요청
    async function requestCommentDelete(postId, commentId) {
        const response = await new Api()
            .delete()
            .url(apiPath.DELETE_COMMENT_API_URL(postId, commentId))
            .print()
            .request();
        return response;
    }
    return root;
}