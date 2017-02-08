import store from 'store/entries';

const sheetID = 'incomes';

function getAll() {
    return new Promise((resolve, reject) => {
        store.getAll(sheetID).then((allIncomes) => {
            return resolve(allIncomes);
        });
    });
}

function filterToday(allIncomes) {
    if (cachedTodayIncomes) {
        return cachedTodayIncomes;
    }

    const todayString = new Date().toDateString(),
        todayIncomes = allIncomes.filter((entry) => {
            return new Date(entry.date).toDateString() === todayString;
        });

    cachedTodayIncomes = todayIncomes;

    return todayIncomes;
}

function add(income) {
    store.add(sheetID, income);
}

function replaceAll(incomes) {
    store.replaceAll(sheetID, incomes);
}

export default {
    add,
    filterToday,
    getAll,
    replaceAll
}
