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

    function getAll () {
        return new Promise((resolve) => {
            Promise.all([get('planned-incomes'), get('planned-spendings')]).then((values) => {
                const [rawIncomes, rawSpendings] = values;

                incomes = [];
                spendings = [];

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
        let sheetID = '';

        if (toAdd.type === 'spend') {
            sheetID = 'planned-spendings';
            spendings.push(toAdd);
        } else {
            sheetID = 'planned-incomes';
            incomes.push(toAdd);
        }

        toAdd.price = formatPrice(toAdd.price);

        store.add(sheetApi, sheetID, toAdd);
        allEntries.push(toAdd);

        return allEntries;
    }

    function remove (allEntries, toRemove) {
        let sheetID = '', toReplace = [];

        if (toRemove.type === 'spend') {
            sheetID = 'planned-spendings';
            toReplace = spendings;
        } else {
            sheetID = 'planned-incomes';
            toReplace = incomes;
        }

        toReplace.splice(toReplace.indexOf(toRemove), 1);
        allEntries.splice(allEntries.indexOf(toRemove), 1);
        store.replaceAll(sheetApi, sheetID, toReplace);

        return allEntries;
    }

    createdStore = {
        add,
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
