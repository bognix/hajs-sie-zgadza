import sheet from '../utils/sheet';

let allSpendsCached, todaySpendsCached;

export function getTodaySpends(allSpends) {

        const todayString = new Date().toDateString(),
            todaySpends = allSpends.filter((spend) => {
                return new Date(spend.date).toDateString() === todayString;
            });

        todaySpendsCached = todaySpends;

        return todaySpends;

}

export function getAllSpends() {
    return new Promise((resolve, reject) => {
        if (allSpendsCached) {
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
    getAllSpends,
    getTodaySpends
};
