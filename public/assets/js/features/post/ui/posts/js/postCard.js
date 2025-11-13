import { activeFeatureCss } from "../../../../../shared/lib/dom.js";
import { emit } from "../../../../../shared/lib/eventBus.js";
import { apiPath } from "../../../../../shared/path/apiPath.js";
import { cssPath } from "../../../../../shared/path/cssPath.js";

activeFeatureCss(cssPath.POST_CARD_CSS_PATH);

export function postCard(post) {
    const { id, title, like, commentCount, hit, createdAt, authorImage, authorNickname } = post;

    const root = document.createElement("div");
    root.className = 'post-card-container';
    root.id = `post-card-${id}`;
    root.innerHTML =
        `
        <div class="post-card-wrapper">
            <button class="post-card-detail-btn">
                <div class="post-card-summary-field">
                    <h2 class="post-card-summary-title">${title}</h2>
                    <div class="post-card-summary-info">
                        <label class="post-card-summary-like">좋아요 ${like}</label>
                        <label class="post-card-summary-comment">댓글 ${commentCount}</label>
                        <label class="post-card-summary-viewcount">조회 수 ${hit}</label>
                        <label class="post-card-summary-createdat">${createdAt}</label>
                    </div>
                </div>
                <div class="post-card-author-field">
                    <div class="post-card-author-profile">
                        <img ${authorImage ? `src="${apiPath.API_SERVER_URL + authorImage}"` : ''}>
                    </div>
                    <div class="post-card-author-nickname">${authorNickname}</div>
                </div>
            </button>
        </div>
        `;


    root.addEventListener('click', () => {
        const postId = id;
        emit('post:postCardClick', { postId });
    })
    return root;
}