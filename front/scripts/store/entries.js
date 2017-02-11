import sheet from 'utils/sheet';

export function getAll (sheetID) {
    return new Promise((resolve, reject) => {
        sheet.getAll(sheetID).then((data) => {
            if (!data.values) {
                return resolve([]);
            }

            return resolve(data.values);
        }).catch((err) => {
            reject(err);
        });
    });
}

export function add (sheetID, entry) {
    sheet.addRow(sheetID, entry);
}

export function replaceAll (sheetID, entries) {
    sheet.replaceAllRows(sheetID, entries);
}

export default {
    getAll,
    add,
    replaceAll
};
