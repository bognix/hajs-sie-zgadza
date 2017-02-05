import {getCookie} from 'utils/cookie';
import sheetConfig from '../../config/sheet.json'

const range = 'A:D',
    spendProperties = 4;

export function getAll() {
    return new Promise(function(resolve, reject) {
        fetch(createRequest({
                path: `values/all!${range}`
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

export function add(spend) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();

        fetch(createRequest({
                method: 'post',
                path: `values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
                body: JSON.stringify({
                    values: [
                        [spend.name, spend.price, spend.category, spend.date]
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

export function put(spendings) {
    return new Promise((resolve, reject) => {
        const values = [];

        spendings.forEach((spend) => {
            values.push(Object.values(spend));
        });

        values.push(Array(spendProperties).fill(''));

        fetch(createRequest({
                method: 'post',
                path: 'values:batchUpdate',
                body: JSON.stringify({
                    data: {
                        range: range,
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
    getAll
}
