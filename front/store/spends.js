import sheet from '../utils/sheet';

export function getTodaySpends() {
    return new Promise((resolve, reject) => {
        getAllSpends().then((spends) => {
            const todayString = new Date().toDateString(),
                todaySpends = spends.filter((spend) => {
                    return new Date(spend.date).toDateString() === todayString;
                });

            resolve(todaySpends);
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getAllSpends() {
    return new Promise((resolve, reject) => {
        sheet.getAll().then((data) => {
            const parsedData = [];
            data.values.forEach((singleSpend) => {
                parsedData.push({
                    name: singleSpend[0],
                    price: singleSpend[1],
                    date: singleSpend[2]
                });
            });

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
