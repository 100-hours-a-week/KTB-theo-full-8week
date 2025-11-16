export const apiPath = {
    API_SERVER_URL: 'http://localhost:8080',

    // Image Storage
    PROFILE_IMAGE_STORATE_URL: 'http://localhost:8080/images/profile/',
    ARTICLE_IMAGE_STORAGE_URL: 'http://localhost:8080/images/article/',

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
    POST_DETAIL_API_URL: (postId) => `/post/${postId}`,

    // Comment
    CREATE_COMMENT_API_URL: (postId) => `/post/${postId}/comment`,
    FIND_COMMENTS_API_URL: (postId) => `/post/${postId}/comment`,
}
Object.freeze(apiPath); // ENUM;