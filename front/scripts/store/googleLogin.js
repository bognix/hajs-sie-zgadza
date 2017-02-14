let storedToken = '';

function setToken (token) {
    storedToken = token;
}

function getToken () {
    return storedToken;
}

export default {
    getToken,
    setToken
};
