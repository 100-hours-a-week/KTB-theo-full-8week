import { activeFeatureCss } from "../../../../../shared/lib/dom.js";
import { cssPath } from "../../../../../shared/path/cssPath.js";
import { Api } from "../../../../../shared/lib/api.js";
import { apiPath } from "../../../../../shared/path/apiPath.js";
import { isBlank, getNowData } from "../../../../../shared/lib/util/util.js";
import { comment } from "./comment.js";
import { ApiError } from "../../../../../shared/lib/api-error.js";

activeFeatureCss(cssPath.COMMENT_CARD_LIST_CSS_PATH);

export function commentCardList(postId) {
    // 현재 페이지
    let currentPage = 0;
    // 페이지당 컨텐츠 개수
    const size = 10;
    // 다음 페이지 여부
    let hasNext = true;
    // 페이지 로딩 플래그
    let isLoading = false;

    const root = document.createElement('div');
    root.className = 'comment-card-list-container';
    root.innerHTML =
        `
         <div class="comment-card-list-wrapper">
            <form id="comment-form">
            <div class="comment-field" >
                <textarea id="comment-form-content" placeholder="댓글을 남겨주세요!"></textarea>
                <button id="comment-create-btn" type="submit">댓글 등록</button>
            </div>
            </form>
        </div>
        `
    const sentinel = document.createElement('div');
    sentinel.className = 'comment-card-list-sentinel';
    root.appendChild(sentinel);

    addObserver();
    loadNextPage();

    const form = root.querySelector('#comment-form');
    const commentTextArea = root.querySelector('#comment-form-content');
    const commentCreateButton = root.querySelector('#comment-create-btn');
    const commentListWrapper = root.querySelector('.comment-card-list-wrapper');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await handleCreateCommentRequest();
    })

    commentTextArea.addEventListener('input', () => {
        activeCommentCreateButton();
    })


    async function handleCreateCommentRequest() {
        if (commentCreateButton.disabled) return;

        try {
            const userId = localStorage.getItem('currentUserId');
            const content = String(commentTextArea.value).trim();
            const response = await requestCreateComment(postId, userId, content);
            const responseBody = response.data;

            const newCommentData = {
                id: responseBody.id,
                authorId: localStorage.getItem('currentUserId'),
                authorNickname: localStorage.getItem('nickname'),
                authorProfileImage: localStorage.getItem('profileImage'),
                updatedAt: getNowData(),
                content: responseBody.content,
            }
            const newComment = comment(newCommentData);
            commentListWrapper.after(newComment);
        } catch (error) {
        }
    }

    // 무한 스크롤용 옵저버 추가
    function addObserver() {
        const observer = new IntersectionObserver(async (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !isLoading && hasNext) {
                await loadNextPage();
            }
        }, { threshold: 0.5 });

        observer.observe(sentinel);
    }

    // 무한 스크롤 페이지 로딩 함수
    async function loadNextPage() {
        try {
            if (isLoading || !hasNext) {
                return;
            }

            isLoading = true;

            const response = await requestFindComments(postId, currentPage, size);
            const responseBody = response.data;
            console.log(responseBody);

            const contents = responseBody.contents;
            contents.forEach((item) => {
                root.insertBefore(comment(item), sentinel);
            });

            // 다음 로드 페이지 미리 계산
            currentPage = responseBody.currentPage + 1;
            // 다음 페이지 여부
            hasNext = responseBody.hasNext;
        } catch (error) {
            if (error instanceof ApiError) {

            }
        } finally {
            isLoading = false;
        }
    }

    // 댓글 생성 버튼 활성화 검사 핸들러
    function activeCommentCreateButton() {
        const content = String(commentTextArea.value).trim();
        const isFilled = !isBlank(content);

        if (!isFilled) {
            commentCreateButton.classList.remove('active');
            commentCreateButton.disabled = true;
            return;
        }

        const canActive = isFilled;
        commentCreateButton.classList.add('active');
        commentCreateButton.disabled = !canActive;
    }

    async function requestCreateComment(postId, userId, content) {
        const response = await new Api()
            .post()
            .url(apiPath.CREATE_COMMENT_API_URL(postId))
            .body({
                userId: userId,
                content: content
            })
            .print()
            .request();

        return response;
    }

    // 게시글 댓글 조회 API 요청
    // start, default Page = 0
    async function requestFindComments(postId, page, size) {
        const response = await new Api()
            .get()
            .url(apiPath.FIND_COMMENTS_API_URL(postId))
            .queryString({ page, size })
            .print()
            .request();

        return response;
    }
    return root;
}