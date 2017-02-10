function formatDate (dateObject) {
    // month indexing starts from 0 (????)
    const month = formatMonth(dateObject.getMonth()),
        day = appendZero(dateObject.getDate());

    return `${dateObject.getFullYear()}-${month}-${day}`;
}

function filterToday (allEntries) {
    const todayString = new Date().toDateString(),
        todayEntries = allEntries.filter(
            (entry) => new Date(entry.date).toDateString() === todayString);

    return todayEntries;
}

function getCurrentMonthYear () {
    const today = new Date();

    return String(`${formatMonth(today.getMonth())}-${today.getFullYear()}`);
}

function formatMonth(month) {
    return appendZero(month+1);
}
function appendZero(index) {
    return index < 10 ? `0${index}` : `${index}`;
}

export default {
    getCurrentMonthYear,
    formatDate,
    filterToday
};
