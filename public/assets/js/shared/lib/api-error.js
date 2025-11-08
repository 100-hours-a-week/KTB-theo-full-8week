/*
{code: 404, 
status: 'NOT_FOUND', 
message: '사용자를 찾을 수 없습니다.', 
path: '/auth/access/token'}
*/

export class ApiError extends Error {
    constructor(code, status, message, path) {
        super(message);
        this.code = code;
        this.status = status;
        this.message = message;
        this.path = path;
    }
}