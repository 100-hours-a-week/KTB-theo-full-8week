const FUEATURES_CSS_PATH_PREFIX = './assets/js/features';
const COMMON_CSS_PATH_PREFIX = './assets/js/shared/ui'

/**
 * 
 * @param {*} href 도메인 내 css 파일 위치 ex) /auth/ui/login.css 
 * @returns 호출한 css를 index.html에 적용
 */
export function activeFeatureCss(href) {
    const exists = [...document.styleSheets].some((s) => {
        return s.href.endsWith(href);
    })

    if (exists) {
        return;
    } else {
        const link = document.createElement('link')
        link.rel = 'stylesheet';
        link.href = FUEATURES_CSS_PATH_PREFIX + href;
        document.head.appendChild(link);
    }
}

// 공통 컴포넌트 CSS 적용
export function activeCommonCss(href) {
    const exists = [...document.styleSheets].some((s) => {
        return s.href.endsWith(href);
    })

    if (exists) {
        return;
    } else {
        const link = document.createElement('link')
        link.rel = 'stylesheet';
        link.href = COMMON_CSS_PATH_PREFIX + href;
        document.head.appendChild(link);
    }
}