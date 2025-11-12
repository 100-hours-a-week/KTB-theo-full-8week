export const eventBus = new EventTarget();

export const emit = ((eventType, detail) => {
    eventBus.dispatchEvent(new CustomEvent(eventType, { detail }));
})