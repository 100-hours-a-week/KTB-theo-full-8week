export const apiPath = {
    API_SERVER_URL: 'http://localhost:8080',

    // Auth
    LOGIN_API_URL: '/auth/access/token',

    //User
    SIGNUP_URL: '/user',
    EAMIL_DOUBLE_CHECK_URL: '/user/email/double-check',
    NICKNAME_DOUBLE_CHECK_URL: '/user/nickname/double-check',

    //Post
    POST_CARD_LIST_API_URL: '/post'
}
Object.freeze(apiPath); // ENUM;