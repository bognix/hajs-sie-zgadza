function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateRandomInt() {
    return Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
}

export default {
    generateUUID,
    generateRandomInt
}
