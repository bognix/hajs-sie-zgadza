import random from 'utils/random';
import sheetService from 'services/sheets';

export default function create (params) {
    const {token, range, spreadSheetId} = params;
    let existingSheets = [];

    function createRequest ({
            method = 'get',
            path = '',
            body = null
        } = {}) {

        const requestConfig = {
            method,
            path,
            spreadSheetId,
            body,
            token
        };

        return sheetService.createRequest(requestConfig);
    }

    function buildCreateSheetRequest (properties) {
        return {
            path: ':batchUpdate',
            body: JSON.stringify({
                requests: [
                    {
                        "addSheet": {
                            "properties": {
                                sheetId: random.generateRandomInt(),
                                title: properties.sheetTitle,
                                hidden: false
                            }
                        }
                    }],
                "includeSpreadsheetInResponse": false,
                "responseRanges": [
                    range
                ],
                "responseIncludeGridData": false
            }),
            method: 'post'
        };
    }

    function createSheet (sheetID) {
        const sheetToFetch = existingSheets.find((sheet) => sheet.properties.title === sheetID);

        return new Promise((resolve) => {
            if (sheetToFetch) {
                resolve();
            } else {
                existingSheets.push({
                    properties: {
                        title: sheetID
                    }
                });

                fetch(createRequest(buildCreateSheetRequest({
                    sheetTitle: sheetID
                }))).then(resolve);
            }
        });
    }

    function getSheets () {
        return new Promise((resolve, reject) => {
            if (existingSheets.length > 0) {
                return resolve(existingSheets);
            }

            return fetch(createRequest()).
                    then((response) => {
                        if (response.ok) {
                            return response.json();
                        }

                        return reject(response.json());
                    }).
                    then((spreadSheetData) => {
                        existingSheets = spreadSheetData.sheets;
                        resolve(existingSheets);
                    });
        });
    }

    function getAll (sheetID) {
        return new Promise((resolve, reject) => {

            getSheets().
            then(() => createSheet(sheetID)).
                then(() => fetch(createRequest({
                    path: `/values/${sheetID}!${range}`
                }))).
                then((response) => {
                    if (response.ok) {
                        return response.json();
                    }

                    return reject(response.status);
                }).
                then((data) => {
                    resolve(data);
                }).
                catch((err) => {
                    reject(err);
                });
        });
    }

    function addRow (sheetID, values) {
        return new Promise((resolve, reject) => {
            createSheet(sheetID).
                    then(() => fetch(createRequest({
                        method: 'post',
                        path: `/values/${sheetID}!${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
                        body: JSON.stringify({
                            values
                        })
                    }))).
                    then((response) => {
                        if (response.ok) {
                            return response.json();
                        }

                        return reject(response.status);
                    }).
                    catch((err) => {
                        reject(err);
                    });
        });
    }

    function replaceAllRows (sheetID, entries) {
        return new Promise((resolve, reject) => {
            const values = [];

            entries.forEach((entry) => {
                values.push(Object.values(entry));
            });

            fetch(createRequest({
                method: 'post',
                path: `/values/${sheetID}!${range}:clear`
            })).
            then(() => fetch(createRequest({
                method: 'post',
                path: '/values:batchUpdate',
                body: JSON.stringify({
                    data: {
                        range: `${sheetID}!${range}`,
                        values
                    },
                    valueInputOption: "USER_ENTERED",
                    includeValuesInResponse: false
                })
            }))).
            then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return reject(response.status);
            }).
            catch((err) => {
                reject(err);
            });
        });
    }

    return {
        getAll,
        addRow,
        replaceAllRows
    };
}
