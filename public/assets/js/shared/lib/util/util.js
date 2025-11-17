import { regex } from "../../regex/regex.js";

export function isEmail(email) {
    return Boolean(regex.EMAIL.test(email));
}

export function isValidPasswordPattern(password) {
    return Boolean(regex.PASSWORD.test(password));
}

export function isBlank(str) {
    return !str || str.trim().length === 0;
}

export function isOverMaxLength(str, max) {
    return str.length >= max;
}

export function isBetweenLength(str, min, max) {
    return (str.length >= min) && (str.length <= max);
}

export function isFile(file) {
    return file.type.startsWith('image/');
}

export function getNowData() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}