const BASE_URL = "https://api.github.com";

const getGistsForUser = (username) => {
    return `${BASE_URL}/users/${username}/gists`;
};

const getSingleGistUrl = (gistId) => {
    return `${BASE_URL}/gists${gistId}`;
};

export { getGistsForUser, getSingleGistUrl };