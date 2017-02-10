import {
    getCookie
} from 'utils/cookie';
import sheetConfig from 'sheet.json';
import date from 'utils/date';
import random from 'utils/random';

const range = 'A:D',
    numberOfColumns = 4;

export function getAll(sheetID) {
    return new Promise(function (resolve, reject) {
        const datePrefix = date.getCurrentMonthYear(),
            sheetIDToFetch = `${datePrefix}-${sheetID}`;

        //TODO optimiziation: make this request only once
        fetch(createRequest())
            .then((spreadSheetDataRaw) => {
                if (spreadSheetDataRaw.ok) {
                    return spreadSheetDataRaw.json();
                } else {
                    reject(response.status);
                }
            }).then((spreadSheetData) => {
                const sheetToFetch = spreadSheetData.sheets.find((sheet) => {
                    return sheet.properties.title === sheetIDToFetch;
                });
                if (sheetToFetch) {
                    return fetch(createRequest({
                        path: `/values/${sheetToFetch.properties.title}!${range}`
                    }));
                } else {
                    //TODO some notification this request failed
                    fetch(createRequest(buildCreateSheetRequest({
                        sheetTitle: sheetIDToFetch
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
        const formData = new FormData(),
            datePrefix = date.getCurrentMonthYear(),
            sheetIDToFetch = `${datePrefix}-${sheetID}`;


        fetch(createRequest({
                method: 'post',
                path: `/values/${sheetIDToFetch}!${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
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

        fetch(createRequest({
            method: 'post',
            path: `/values/${sheetID}!${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
            body: JSON.stringify({
                values: [
                    [entry.name, entry.price, entry.category, entry.date]
                ]
            })
        }));
    });
}

export function replaceAllRows(sheetID, entries) {
    return new Promise((resolve, reject) => {
        const values = [],
            datePrefix = date.getCurrentMonthYear(),
            sheetIDToFetch = `${datePrefix}-${sheetID}`;

        entries.forEach((entry) => {
            values.push(Object.values(entry));
        });

        values.push(Array(numberOfColumns).fill(''));

        fetch(createRequest({
                method: 'post',
                path: '/values:batchUpdate',
                body: JSON.stringify({
                    data: {
                        range: `!${sheetIDToFetch}!${range}`,
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

    fetch(createRequest({
        method: 'post',
        path: '/values:batchUpdate',
        body: JSON.stringify({
            data: {
                range: `!${sheetID}!${range}`,
                values: values
            },
            valueInputOption: "USER_ENTERED",
            includeValuesInResponse: false
        })
    }));
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
