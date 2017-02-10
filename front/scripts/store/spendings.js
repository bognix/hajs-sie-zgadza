import store from 'store/entries';
import date from 'utils/date';

const sheetPrefix = 'spendings';

function getAll() {
    return new Promise((resolve, reject) => {
        const sheetID = `${date.getCurrentMonthYear()}-${sheetPrefix}`

        store.getAll(sheetID).then((allSpendings) => {
            return resolve(allSpendings);
        });
    });
}

function add(spend) {
    const sheetID = `${date.getMonthYear(new Date(spend.date))}-${sheetPrefix}`;

    store.add(sheetID, spend);
}

function remove(spendings, spend) {
    const indexToRemove = spendings.indexOf(spend),
        sheetID = `${date.getMonthYear(new Date(spend.date))}-${sheetPrefix}`;

    spendings.splice(indexToRemove, 1);

    // TODO create notification about successful save
    store.replaceAll(sheetID, spendings);

    return spendings;
}
export default {
    add,
    getAll,
    remove
}
