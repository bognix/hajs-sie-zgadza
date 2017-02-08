import sheet from 'utils/sheet';

export function getAll(sheetID) {
    return new Promise((resolve, reject) => {
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

            return resolve(parsedData);
        }).catch((err) => {
            reject(err);
        });
    });
}

export function add(sheetID, entry) {
    sheet.addRow(sheetID, entry);
}

export function replaceAll(sheetID, entries) {
    sheet.replaceAllRows(sheetID, entries);
}

export default {
    getAll,
    add,
    replaceAll
};
