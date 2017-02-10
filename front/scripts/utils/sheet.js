import {
    getCookie
} from 'utils/cookie';
import sheetConfig from 'sheet.json';
import date from 'utils/date';
import random from 'utils/random';

const range = 'A:D',
    numberOfColumns = 4;

let existingSheets = [];

export function getAll(sheetID) {
    return new Promise(function (resolve, reject) {

        //TODO optimiziation: make this request only once
        fetch(createRequest())
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(response.status);
                }
            }).then((spreadSheetData) => {
                existingSheets = spreadSheetData.sheets;

                const sheetToFetch = spreadSheetData.sheets.find((sheet) => {
                    return sheet.properties.title === sheetID;
                });

                if (sheetToFetch) {
                    return fetch(createRequest({
                        path: `/values/${sheetID}!${range}`
                    }));
                } else {
                    //TODO some notification this request failed
                    fetch(createRequest(buildCreateSheetRequest({
                        sheetTitle: sheetID
                    })));

                    return resolve({});
                }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    reject(response.status)
                }
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function addRow(sheetID, entry) {
    return new Promise((resolve, reject) => {
        const sheetToFetch = existingSheets.find((sheet) => {
                return sheet.properties.title === sheetID;
            });

        if (!sheetToFetch) {
            //TODO create decorator if sheet doesn't exitst to avoid if/else
            fetch(createRequest(buildCreateSheetRequest({
                    sheetTitle: sheetID
                })))
                .then(() => {
                    existingSheets.push({
                        title: sheetID
                    });
                    return fetch(createRequest({
                        method: 'post',
                        path: `/values/${sheetID}!${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
                        body: JSON.stringify({
                            values: [
                                [entry.name, entry.price, entry.category, entry.date]
                            ]
                        })
                    }));
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        reject(response.status)
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        } else {
            fetch(createRequest({
                method: 'post',
                path: `/values/${sheetID}!${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
                body: JSON.stringify({
                    values: [
                        [entry.name, entry.price, entry.category, entry.date]
                    ]
                })
            }))
            .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        reject(response.status)
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
}

export function replaceAllRows(sheetID, entries) {
    return new Promise((resolve, reject) => {
        const values = [],
            datePrefix = date.getCurrentMonthYear();

        entries.forEach((entry) => {
            values.push(Object.values(entry));
        });

        values.push(Array(numberOfColumns).fill(''));

        fetch(createRequest({
                method: 'post',
                path: '/values:batchUpdate',
                body: JSON.stringify({
                    data: {
                        range: `${sheetID}!${range}`,
                        values: values
                    },
                    valueInputOption: "USER_ENTERED",
                    includeValuesInResponse: false
                })
            }))
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    reject(response.status)
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function buildCreateSheetRequest(properties) {
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
            "responseIncludeGridData": false,
        }),
        method: 'post'
    }
}

function createRequest({
    method = 'get',
    path = '',
    body = null
} = {}) {
    const spreadSheetId = sheetConfig.spreadSheetId,
        token = getCookie('token'),
        authHeader = `Bearer ${token}`,
        requestConfig = {
            method,
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
    // path has to start with `/` if it's expected
    return new Request(`https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}${path}`, requestConfig);
}

export default {
    getAll,
    addRow,
    replaceAllRows
}
