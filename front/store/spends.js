import sheet from '../utils/sheet';

let allSpendsCached, todaySpendsCached;

export function getTodaySpends() {
    return new Promise((resolve, reject) => {
        if (todaySpendsCached) {
            return resolve(todaySpendsCached);
        }

        getAllSpends().then((spends) => {
            const todayString = new Date().toDateString(),
                todaySpends = spends.filter((spend) => {
                    return new Date(spend.date).toDateString() === todayString;
                });

            todaySpendsCached = todaySpends;

            return resolve(todaySpends);
        }).catch((err) => {
            return reject(err);
        });
    });
}

export function getAllSpends() {
    return new Promise((resolve, reject) => {
        if (allSpendsCached) {
            return resolve(allSpendsCached);
        }

        sheet.getAll().then((data) => {
            const parsedData = [];

            data.values.forEach((singleSpend) => {
                parsedData.push({
                    name: singleSpend[0],
                    price: singleSpend[1],
                    date: singleSpend[2]
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
    getAllSpends,
    getTodaySpends
}
