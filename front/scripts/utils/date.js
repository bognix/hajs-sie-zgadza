function formatDate(dateObject) {
    const month = dateObject.getMonth() + 1 < 10 ?
        `0${dateObject.getMonth() + 1}` : dateObject.getMonth(),
        day = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate();

    return `${dateObject.getFullYear()}-${month}-${day}`;
}

function filterToday(allEntries) {
    const todayString = new Date().toDateString(),
        todayEntries = allEntries.filter((entry) => {
            return new Date(entry.date).toDateString() === todayString;
        });

    return todayEntries;
}

export default {
    formatDate,
    filterToday
};
