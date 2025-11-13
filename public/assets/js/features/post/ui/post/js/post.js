import { activeFeatureCss } from "../../../../../shared/lib/dom.js";
import { emit } from "../../../../../shared/lib/eventBus.js";
import { cssPath } from "../../../../../shared/path/cssPath.js";


activeFeatureCss(cssPath.POST_CSS_PATH);

export function post() {
    const root = document.createElement('div');
    root.className = 'post-container';
    root.innerHTML =
        `
        <div class="post-wrapper">
            <div class="post-header-container">
                <div class="post-header-top">
                    <h2>제목1</h2>
                    <button id="post-back-btn">목록으로</button>
                </div>
                <div class="post-header-meta">
                    <div class="post-author-field">
                        <div class="post-author-profile">
                            <img id="post-author-profile-image">
                        </div>
                        <label class="post-author-nickname-field">더미 작성자</label>
                        <p class="post-createdat">2021-01-01 00:00:00</p>
                    </div>
                    <div class="post-control-field">
                        <button id="post-update-btn" class="post-control-btn">수정</button>
                        <button id="post-delete-btn" class="post-control-btn">삭제</button>
                    </div>
                </div>
            </div>
            <div class="post-article-container">
                <div class="post-article-image-box">
                    <img id="post-article-image">
                </div>
                <p id="post-article-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi quis ad
                    commodi! Exercitationem veniam cumque ullam dignissimos odio corporis tempora similique consectetur
                    eveniet repudiandae maxime, fugit iste, officia labore magni!
                    Esse ratione rem explicabo repellendus optio harum, ea distinctio tempora quasi sint, molestiae
                    saepe delectus quaerat sequi officiis neque fuga dignissimos. Reiciendis consequatur deserunt labore
                    iusto magni rem ipsum quaerat!
                    Sequi possimus et dicta similique, nisi vitae ratione nam ducimus, pariatur eaque debitis assumenda
                    vel eos corporis maxime ipsum earum eius nulla. Odio fugiat neque, dolorum voluptates asperiores
                    veniam ab.</p>
                <div class="post-article-status">
                    <div class="post-article-like-box">
                        <label>123</label>
                        <label>좋아요 수</label>
                    </div>
                    <div class="post-article-viewcount-box">
                        <label>123</label>
                        <label>조회 수</label>
                    </div>
                    <div class="post-article-comment-box">
                        <label>123</label>
                        <label>댓글</label>
                    </div>
                </div>
            </div>
            <div class="post-comment-container"></div>
        </div>
        `;

    const backToListButton = root.querySelector('#post-back-btn');

    backToListButton.addEventListener('click', () => {
        emit('post:backToList');
    })
    return root;
}