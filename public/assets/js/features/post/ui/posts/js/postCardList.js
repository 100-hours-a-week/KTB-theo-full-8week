import { activeFeatureCss } from "../../../../../shared/lib/dom.js";
import { cssPath } from "../../../../../shared/path/cssPath.js";
import { Api } from "../../../../../shared/lib/api.js";
import { ApiError } from "../../../../../shared/lib/api-error.js";
import { postCard } from "./postCard.js";
import { postCardListHeader } from "./postCardListHeader.js";
import { apiPath } from "../../../../../shared/path/apiPath.js";
import { eventBus } from "../../../../../shared/lib/eventBus.js";
import { post } from "../../post/js/post.js";

activeFeatureCss(cssPath.POST_CARD_LIST_CSS_PATH);

export function postCardList() {
    // 현재 페이지
    let currentPage = 0;
    // 페이지당 컨텐츠 개수
    let size = 10;
    // 다음 페이지 여부
    let hasNext = true;
    // 페이지 로딩 플래그
    let isLoading = false;


    const root = document.createElement('div');
    root.className = 'post-card-list-container';

    const listSection = document.createElement('div');
    listSection.className = 'post-card-list-section';
    listSection.classList.add('active');

    listSection.appendChild(postCardListHeader());

    // 무한 스크롤용 sentinel 박스 생성
    const sentinel = document.createElement('div');
    sentinel.className = 'post-card-list-sentinel';
    listSection.appendChild(sentinel);


    // 게시글 상세페이지 섹션
    const detailSection = document.createElement('div');
    detailSection.className = 'post-detail-section';

    root.appendChild(listSection);
    root.appendChild(detailSection);

    addObserver();
    loadNextPage();

    // postCard 클릭 시 -> 상세 화면으로 전환
    eventBus.addEventListener('post:postCardClick', async (event, options) => {
        const { postId } = event.detail;
        listSection.classList.remove('active');
        // const postComponent = post(); // API 호출할거니까 await 붙이기
        detailSection.appendChild(post());
        detailSection.classList.add('active');
    })

    // PostCar에서 '목록으로'버튼 클릭시 게시글 리스트로 전환
    eventBus.addEventListener('post:backToList', (event, options) => {
        detailSection.classList.remove('active');
        detailSection.innerHTML = '';
        listSection.classList.add('active');
    })

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

    // 무한 스크롤 시 페이지 로딩 함수
    async function loadNextPage() {
        try {

            // 로딩 중이거나 다음 페이지 없으면 페이지 로드 X
            if (isLoading || !hasNext) {
                return;
            }

            // 페이지 로드 시작
            isLoading = true;

            const response = await requestPostCardList(currentPage, size);
            const responseBody = response.data;

            // Post 렌더링
            const contents = responseBody.contents;
            contents.forEach((post) => {
                listSection.insertBefore(postCard(post), sentinel);
            })

            // 다음 로드 페이지 계산
            currentPage = responseBody.currentPage + 1;
            // 다음 페이지 여부
            hasNext = responseBody.hasNext;
        } catch (error) {
            if (error instanceof ApiError) {
                // TODO : API 에러 처리
            }
        } finally {
            isLoading = false;
        }
    }

    // 게시글 목록 조회 API 요청
    // start, default Page = 0
    async function requestPostCardList(page, size) {
        try {
            const response = await new Api()
                .get()
                .url(apiPath.POST_CARD_LIST_API_URL)
                .queryString({ page, size })
                .request();

            return response;
        } finally {

        }
    }

    return root;
}