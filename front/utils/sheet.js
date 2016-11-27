import {getCookie} from './cookie';

export function getAll() {
    return new Promise(function (resolve, reject) {
        fetch(createRequest({path: 'values/all!A:B'}))
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    reject(response.status)
                }
            })
            .then((data) => {
                const parsedData = [];
                data.values.forEach((singleSpend) => {
                    parsedData.push({
                        name: singleSpend[0],
                        price: singleSpend[1]
                    });
                });
                resolve(parsedData);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function createRequest({method='get', path=''} = {}) {
    const spreadSheetId = '1wB_sGesIkmu0vcf4tEQ9xaw3T6jCJabTHQTeSDgYrHw',
        token = getCookie('token'),
        authHeader = `Bearer ${token}`,
        requestConfig = {
            method: method,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': authHeader
            },
            mode: 'cors',
            cache: 'default'
        };
    return new Request(`https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/${path}`, requestConfig);
}
