import { activeFeatureCss } from "../../../shared/lib/dom.js";


// CSS Path
const POST_CARD_CSS_PATH = '/post/ui/postCard.css';

activeFeatureCss(POST_CARD_CSS_PATH);

export function postCard() {
    console.log('postCard render');
    // const { title, like, comment, viewCount, createdAt } = post;
    // const { profile, nickname } = author;

    const root = document.createElement("div");
    root.className = 'post-card-container';
    root.innerHTML =
        `
        <div class="post-card-wrapper">
            <button class="post-card-detail-btn">
                <div class="post-card-summary-field">
                    <h2 class="post-card-summary-title">제목 1</h2>
                    <div class="post-card-summary-info">
                        <label class="post-card-summary-like">좋아요 0</label>
                        <label class="post-card-summary-comment">댓글 0</label>
                        <label class="post-card-summary-viewcount">조회 수 0</label>
                        <label class="post-card-summary-createdat">2021-01-01 00:00:00</label>
                    </div>
                </div>
                <div class="post-card-author-field">
                    <div class="post-card-author-profile"></div>
                    <div class="post-card-author-nickname">닉네임</div>
                </div>
            </button>
        </div>
        `;

    return root;
}