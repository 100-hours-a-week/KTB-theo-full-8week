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
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    const utc = now.getDate() + (now.getTimezoneOffset() * 60 * 1000);

    const today = new Date(utc + koreaTimeDiff);
    const year = today.getFullYear();
    const month = ('0' + today.getMonth()).padStart(2, '0');
    const day = ('0' + today.getDate()).padStart(2, '0');
    const hours = ('0' + today.getHours()).padStart(2, '0');
    const minutes = ('0' + today.getMinutes()).padStart(2, '0');
    const second = ('0' + today.getSeconds()).padStart(2, '0');

    const nowDate = `${year}-${month}-${day} ${hours}:${minutes}:${second}`;

    return nowDate;
}