import {getCookie} from 'utils/cookie';
import sheetConfig from 'sheet.json';

const range = 'A:D',
    numberOfColumns = 4;

export function getAll(sheetID) {
    return new Promise(function(resolve, reject) {
        fetch(createRequest({
                path: `values/${sheetID}!${range}`
            }))
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
        const formData = new FormData();

        fetch(createRequest({
                method: 'post',
                path: `values/${sheetID}!${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
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
    });
}

export function replaceAllRows(sheetID, entries) {
    return new Promise((resolve, reject) => {
        const values = [];

        entries.forEach((entry) => {
            values.push(Object.values(entry));
        });

        values.push(Array(numberOfColumns).fill(''));

        fetch(createRequest({
                method: 'post',
                path: 'values:batchUpdate',
                body: JSON.stringify({
                    data: {
                        range: `!${sheetID}!${range}`,
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
    return new Request(`https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/${path}`, requestConfig);
}

export default {
    getAll,
    addRow,
    replaceAllRows
}
