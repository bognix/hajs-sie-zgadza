import date from 'utils/date';
import {formatPrice} from 'utils/price';
import store from 'store/entries';

let createdStore = null;

function getStore (sheetApi) {
    let incomes = [], spendings = [];

    function get (sheetID) {
        return new Promise((resolve) => {
            store.getAll(sheetApi, sheetID).then((data) => resolve(data));
        });
    }

    function getAll (datePrefix) {
        return new Promise((resolve) => {
            Promise.all([get(`${datePrefix}-incomes`), get(`${datePrefix}-spendings`)]).then((values) => {
                const [rawIncomes, rawSpendings] = values;

                incomes = [];
                spendings = [];

                rawIncomes.forEach((income) => {
                    if (income[0] && income[1] && income[2] && income[3]) {
                        incomes.push({
                            name: income[0],
                            price: income[1],
                            category: income[2],
                            date: income[3],
                            type: 'income'
                        });
                    }
                });

                rawSpendings.forEach((spend) => {
                    if (spend[0] && spend[1] && spend[2] && spend[3]) {
                        spendings.push({
                            name: spend[0],
                            price: spend[1],
                            category: spend[2],
                            date: spend[3],
                            type: 'spend'
                        });
                    }
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

        toAdd.price = formatPrice(toAdd.price);

        const sheetID = `${date.getMonthYear(new Date(toAdd.date))}-${sheetSuffix}`;

        store.add(sheetApi, sheetID, toAdd);

        allEntries.push(toAdd);

        return allEntries;
    }

    function addMany (allEntries, toAdd, entryDate) {
        const incomesToAdd = [], spendingsToAdd = [],
            incomesSheetID = `${date.getMonthYear(new Date(entryDate))}-incomes`,
            spendingsSheetID = `${date.getMonthYear(new Date(entryDate))}-spendings`;

        toAdd.forEach((entryToAdd) => {
            entryToAdd.date = entryDate;

            if (entryToAdd.type === 'spend') {
                spendingsToAdd.push(entryToAdd);
                spendings.push(entryToAdd);
            } else {
                incomesToAdd.push(entryToAdd);
                incomes.push(entryToAdd);
            }
        });

        store.addMany(sheetApi, incomesSheetID, incomesToAdd);
        store.addMany(sheetApi, spendingsSheetID, spendingsToAdd);

        return allEntries.concat(incomesToAdd, spendingsToAdd);
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

        store.replaceAll(sheetApi, sheetID, toReplace);

        allEntries.splice(allEntries.indexOf(toRemove), 1);

        return allEntries;
    }

    createdStore = {
        add,
        addMany,
        getAll,
        remove
    };

    return createdStore;
}

function getStoreInstance (...args) {
    if (createdStore) {
        return createdStore;
    }

    return getStore(...args);
}

export default {
    getStoreInstance
};
