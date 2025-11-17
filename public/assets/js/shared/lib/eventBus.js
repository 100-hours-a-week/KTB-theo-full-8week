// 커스텀 이벤트 전달 객체
export const eventBus = new EventTarget();

// 커스텀 이벤트 전파
export const emit = ((eventType, detail) => {
    eventBus.dispatchEvent(new CustomEvent(eventType, { detail }));
})