import sheet from '../utils/sheet';

let allSpendsCached, todaySpendsCached;

export function getAllSpends(forceUpdate = false) {
    return new Promise((resolve, reject) => {
        if (!forceUpdate && allSpendsCached) {
            return resolve(allSpendsCached);
        }

        sheet.getAll().then((data) => {
            const parsedData = [];

            if (!data.values) {
                return resolve(parsedData);
            }

            data.values.forEach((singleSpend) => {
                parsedData.push({
                    name: singleSpend[0],
                    price: singleSpend[1],
                    category: singleSpend[2],
                    date: singleSpend[3]
                });
            });

            allSpendsCached = parsedData;

            return resolve(parsedData);

            }).catch((err) => {
                reject(err);
            });
    });
}

export default {
    getAllSpends
};
