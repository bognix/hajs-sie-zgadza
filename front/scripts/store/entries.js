function getAll (sheetApi, sheetID) {

    return new Promise((resolve, reject) => {
        sheetApi.getAll(sheetID).then((data) => {
            if (!data.values) {
                return resolve([]);
            }

            return resolve(data.values);
        }).
        catch((err) => {
            reject(err);
        });
    });
}

function add (sheetApi, sheetID, entry) {
    sheetApi.addRow(sheetID, [Object.values(entry)]);
}

function addMany (sheetApi, sheetID, entries) {
    const values = [];

    entries.forEach((entry) => {
        values.push(Object.values(entry));
    });

    sheetApi.addRow(sheetID, values);
}

function replaceAll (sheetApi, sheetID, entries) {
    sheetApi.replaceAllRows(sheetID, entries);
}

export default {
    getAll,
    add,
    addMany,
    replaceAll
};
