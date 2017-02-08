import store from 'store/entries';

const sheetID = 'spendings';

function getAll() {
    return new Promise((resolve, reject) => {
        store.getAll(sheetID).then((allSpendings) => {
            return resolve(allSpendings);
        });
    });
}

function add(spending) {
    store.add(sheetID, spending);
}

function replaceAll(spendings) {
    store.replaceAll(sheetID, spendings);
}

export default {
    add,
    getAll,
    replaceAll
}
