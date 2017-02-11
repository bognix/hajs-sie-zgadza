import date from 'utils/date';
import store from 'store/entries';

const incomes = [], spendings = [];


function get (sheetID) {
    return new Promise((resolve) => {
        store.getAll(sheetID).then((data) => resolve(data));
    });
}

function getAll (datePrefix) {
    return new Promise((resolve) => {
        Promise.all([get(`${datePrefix}-incomes`), get(`${datePrefix}-spendings`)]).then((values) => {
            const [rawIncomes, rawSpendings] = values;

            rawIncomes.forEach((income) => {
                incomes.push({
                    name: income[0],
                    price: income[1],
                    category: income[2],
                    date: income[3],
                    type: 'income'
                });
            });

            rawSpendings.forEach((spend) => {
                spendings.push({
                    name: spend[0],
                    price: spend[1],
                    category: spend[2],
                    date: spend[3],
                    type: 'spend'
                });
            });

            resolve(incomes.concat(spendings));
        });
    });
}


function add (allEntries, toAdd) {
    let sheetSuffix = '';

    if (toAdd.type === 'spend') {
        sheetSuffix = 'spendings';
        spendings.push(toAdd);
    } else {
        sheetSuffix = 'incomes';
        incomes.push(toAdd);
    }

    const sheetID = `${date.getMonthYear(new Date())}-${sheetSuffix}`;

    store.add(sheetID, toAdd);

    allEntries.push(toAdd);

    return allEntries;
}

function remove (allEntries, toRemove) {
    let sheetSuffix = '', toReplace = [];

    if (toRemove.type === 'spend') {
        sheetSuffix = 'spendings';
        toReplace = spendings;
    } else {
        sheetSuffix = 'incomes';
        toReplace = incomes;
    }

    toReplace.splice(toReplace.indexOf(toRemove), 1);

    const sheetID = `${date.getMonthYear(new Date(toRemove.date))}-${sheetSuffix}`;

    store.replaceAll(sheetID, toReplace);

    allEntries.splice(allEntries.indexOf(toRemove), 1);

    return allEntries;
}

export default {
    add,
    getAll,
    remove
};
