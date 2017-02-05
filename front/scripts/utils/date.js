function formatDate(dateObject) {
    const month = dateObject.getMonth() + 1 < 10 ?
        `0${dateObject.getMonth() + 1}` : dateObject.getMonth(),
        day = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate();

    return `${dateObject.getFullYear()}-${month}-${day}`;
}

export default {
    formatDate
};
