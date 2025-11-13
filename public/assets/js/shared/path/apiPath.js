export const apiPath = {
    API_SERVER_URL: 'http://localhost:8080',

    // Auth
    LOGIN_API_URL: '/auth/access/token',

    //User
    SIGNUP_URL: '/user',
    FIND_USER_URL: '/user',
    EDIT_USER_URL: '/user',
    EAMIL_DOUBLE_CHECK_URL: '/user/email/double-check',
    NICKNAME_DOUBLE_CHECK_URL: '/user/nickname/double-check',
    NICKNAME_EDIT_URL: (userId) => { return `/user/${userId}/nickname` },
    DELETE_USER_URL: '/user',

    //Post
    POST_CARD_LIST_API_URL: '/post',
    MAKE_POST_API_URL: '/post',
}
Object.freeze(apiPath); // ENUM;