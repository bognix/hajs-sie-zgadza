function appendZero (index) {
    return index < 10
    ? `0${index}`
    : `${index}`;
}

function formatMonth (month) {
    return appendZero(month + 1);
}

function formatDate (dateObject) {
    // Month indexing starts from 0 (????)
    const month = formatMonth(dateObject.getMonth()),
        day = appendZero(dateObject.getDate());

    return `${dateObject.getFullYear()}-${month}-${day}`;
}

function filterToday (allEntries) {
    const todayString = new Date().toLocaleDateString(),
        todayEntries = allEntries.filter(
            (entry) => new Date(entry.date).toLocaleDateString() === todayString);

    return todayEntries;
}

function getMonthYear (date) {
    return String(`${formatMonth(date.getMonth())}-${date.getFullYear()}`);
}

function getCurrentMonthYear () {
    return getMonthYear(new Date());
}

function createDateBaseOnMothYear (date) {
    const dateArr = date.split('-');

    dateArr.splice(1, 0, '1');

    return dateArr.join('-');
}
function subtractMonth (dateStr) {
    const date = new Date(createDateBaseOnMothYear(dateStr)),
        subtractedDate = new Date(date.setMonth(date.getMonth() - 1));

    return getMonthYear(subtractedDate);
}

function addMonth (dateStr) {
    const date = new Date(createDateBaseOnMothYear(dateStr)),
        addedDate = new Date(date.setMonth(date.getMonth() + 1));

    return getMonthYear(addedDate);

}


export default {
    getCurrentMonthYear,
    getMonthYear,
    formatDate,
    filterToday,
    subtractMonth,
    addMonth,
    createDateBaseOnMothYear
};
