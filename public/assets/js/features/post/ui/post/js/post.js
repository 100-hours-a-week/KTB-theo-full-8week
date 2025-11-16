import { activeFeatureCss } from "../../../../../shared/lib/dom.js";
import { emit } from "../../../../../shared/lib/eventBus.js";
import { cssPath } from "../../../../../shared/path/cssPath.js";
import { Api } from "../../../../../shared/lib/api.js";
import { apiPath } from "../../../../../shared/path/apiPath.js";
import { commentCardList } from "./commentCardList.js";

activeFeatureCss(cssPath.POST_CSS_PATH);

export async function post(postId) {
    const responseBody = await requestPostDetail(postId);
    const postDetail = responseBody.data;

    const { id, title, authorNickname,
        article, articleImage, authorImage,
        commentCount, createdAt, hit, like } = postDetail;

    console.log(postDetail);
    const root = document.createElement('div');
    root.className = `post-container ${id}`;
    root.innerHTML =
        `
        <div class="post-wrapper">
            <div class="post-header-container">
                <div class="post-header-top">
                    <h2>${title}</h2>
                    <button id="post-back-btn">목록으로</button>
                </div>
                <div class="post-header-meta">
                    <div class="post-author-field">
                        <div class="post-author-profile">
                            <img id="post-author-profile-image"
                            ${authorImage ? `src="${apiPath.PROFILE_IMAGE_STORATE_URL + authorImage}"` : ''}>
                        </div>
                        <label class="post-author-nickname-field">${authorNickname}</label>
                        <p class="post-createdat">${createdAt}</p>
                    </div>
                    <div class="post-control-field">
                        <button id="post-update-btn" class="post-control-btn">수정</button>
                        <button id="post-delete-btn" class="post-control-btn">삭제</button>
                    </div>
                </div>
            </div>
            <div class="post-article-container">
                <div class="post-article-image-box">
                    <img id="post-article-image" 
                    ${articleImage ? `src="${apiPath.ARTICLE_IMAGE_STORAGE_URL + articleImage}"` : ''}>
                </div>
                <p id="post-article-text">${article}</p>
                <div class="post-article-status">
                    <div class="post-article-like-box">
                        <label>${like}</label>
                        <label>좋아요 수</label>
                    </div>
                    <div class="post-article-viewcount-box">
                        <label>${hit}</label>
                        <label>조회 수</label>
                    </div>
                    <div class="post-article-comment-box">
                        <label>${commentCount}</label>
                        <label>댓글</label>
                    </div>
                </div>
            </div>
        </div>
        `;
    root.appendChild(commentCardList(id));


    const backToListButton = root.querySelector('#post-back-btn');

    backToListButton.addEventListener('click', () => {
        emit('post:backToList');
    })



    // API 요청 함수
    // 1. 현재 post 조회 요청 API
    async function requestPostDetail(postId) {
        const response = await new Api()
            .get()
            .url(apiPath.POST_DETAIL_API_URL(postId))
            .print()
            .request();

        return response;
    }
    return root;
}