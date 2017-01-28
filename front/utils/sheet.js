import {getCookie} from './cookie';
import sheetConfig from '../../config/sheet.json'

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

export function add(spend) {
  return new Promise((resolve, reject) => {
      const formData = new FormData();

      fetch(createRequest({
          method: 'post',
          path: 'values/A:B:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS',
          body: JSON.stringify({
              values: [
                  [spend.name, spend.price]
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

}

function createRequest({method='get', path='', body=null} = {}) {
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
