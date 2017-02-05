import sheet from '../utils/sheet';

let allEntriesCached, todayEntriesCached;

export function getTodayEntries(allEntries) {

    const todayString = new Date().toDateString(),
        todayEntries = allEntries.filter((entry) => {
            return new Date(entry.date).toDateString() === todayString;
        });

    todayEntriesCached = todayEntries;

    return todayEntries;

}

export function getAllEntries(sheetID) {
    return new Promise((resolve, reject) => {
        if (allEntriesCached) {
            return resolve(allEntriesCached);
        }

        sheet.getAll(sheetID).then((data) => {
            const parsedData = [];

            if (!data.values) {
                return resolve(parsedData);
            }

            data.values.forEach((singleEntry) => {
                parsedData.push({
                    name: singleEntry[0],
                    price: singleEntry[1],
                    category: singleEntry[2],
                    date: singleEntry[3]
                });
            });

            allEntriesCached = parsedData;

            return resolve(parsedData);

        }).catch((err) => {
            reject(err);
        });
    });
}

export default {
    getAllEntries,
    getTodayEntries
};
