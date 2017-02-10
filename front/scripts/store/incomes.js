import store from 'store/entries';
import date from 'utils/date';

const sheetPrefix = 'incomes';

function getAll() {
    return new Promise((resolve, reject) => {
        const sheetID = `${date.getCurrentMonthYear()}-${sheetPrefix}`

        store.getAll(sheetID).then((allIncomes) => {
            return resolve(allIncomes);
        });
    });
}

function add(income) {
    const sheetID = `${date.getMonthYear(new Date(income.date))}-${sheetPrefix}`;

    store.add(sheetID, income);
}

function remove(incomes, income) {
    const indexToRemove = incomes.indexOf(income),
        sheetID = `${date.getMonthYear(new Date(income.date))}-${sheetPrefix}`;

    incomes.splice(indexToRemove, 1);

    // TODO create notification about successful save
    store.replaceAll(sheetID, incomes);

    return incomes;
}

export default {
    add,
    getAll,
    remove
}
