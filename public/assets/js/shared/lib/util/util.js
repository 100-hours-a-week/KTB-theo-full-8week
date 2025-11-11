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