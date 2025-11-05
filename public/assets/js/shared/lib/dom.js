export function activeCss(href) {
    const exists = [...document.styleSheets].some((s) => {
        s.href?.endsWith(href);
    })

    if (exists) {
        return;
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}