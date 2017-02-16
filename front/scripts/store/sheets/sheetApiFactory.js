import random from 'utils/random';
import sheetConfig from 'sheet.json';

export default function create (params) {
    const {token, range, numberOfColumns} = params,
        {spreadSheetId} = sheetConfig;

    let existingSheets = [];

    function createRequest ({
            method = 'get',
            path = '',
            body = null
        } = {}) {
        const authHeader = `Bearer ${token}`,
            requestConfig = {
                method,
                token,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': authHeader
                },
                mode: 'cors',
                cache: 'default'
            };

        if (body) {
            requestConfig.body = body;
        }

            // Path has to start with `/` if it's expected
        return new Request(`https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}${path}`, requestConfig);
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

            getSheets().then(() => createSheet(sheetID)).
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

            values.push(Array(numberOfColumns).
                    fill(''));

            fetch(createRequest({
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
            })).
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
