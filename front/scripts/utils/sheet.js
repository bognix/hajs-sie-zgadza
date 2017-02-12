import {getCookie} from 'utils/cookie';
import random from 'utils/random';
import sheetConfig from 'sheet.json';

const range = 'A:E',
    numberOfColumns = 5;

let existingSheets = [];

function createRequest ({
    method = 'get',
    path = '',
    body = null
} = {}) {
    const {spreadSheetId} = sheetConfig,
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
                title: sheetID
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
export function getAll (sheetID) {
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

export function addRow (sheetID, entry) {
    return new Promise((resolve, reject) => {
        createSheet(sheetID).
            then(() => fetch(createRequest({
                method: 'post',
                path: `/values/${sheetID}!${range}:append?valueInputOption=USER_ENTERED`,
                body: JSON.stringify({
                    values: [
                        Object.values(entry)
                    ],
                    insertDataOption: 'INSERT_ROWS'
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

export function replaceAllRows (sheetID, entries) {
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

export default {
    getAll,
    addRow,
    replaceAllRows
};
