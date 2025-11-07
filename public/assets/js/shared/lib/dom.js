const FUEATURES_CSS_PATH_PREFIX = './assets/js/features';
const COMMONT_CSS_PATH_PREFIX = '..'

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
        link.href = CSS_PATH_PREFIX + href;
        document.head.appendChild(link);
    }

}

export function activeCommonCss(href) {
    const exists = [...document.styleSheets].some((s) => {
        return s.href.endsWith(href);
    })

    if (exists) {
        return;
    } else {
        const link = document.createElement('link')
        link.rel = 'stylesheet';
        link.href = CSS_PATH_PREFIX + href;
        document.head.appendChild(link);
    }
}