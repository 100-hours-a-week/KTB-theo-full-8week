export class ApiError extends Error {
    constructor(code, status, message, path) {
        super(message);
        this.code = code;
        this.status = status;
        this.message = message;
        this.path = path;
    }
}