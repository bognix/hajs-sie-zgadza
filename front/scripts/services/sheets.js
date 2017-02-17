function createRequest ({
        method = 'get',
        body = null,
        path,
        spreadSheetId,
        token
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

    if (body && method === 'post') {
        requestConfig.body = body;
    }

        // Path has to start with `/` if it's expected
    return new Request(`https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}${path}`, requestConfig);
}

function createSpreadSheet (token) {
    return new Promise((resolve) => fetch(createRequest({
        method: 'post',
        spreadSheetId: '',
        body: JSON.stringify({
            properties: {
                title: 'hajs-sie-zgadza'
            },
            sheets: [
                {
                    properties: {
                        title: 'planned-incomes'
                    }
                },
                {
                    properties: {
                        title: 'planned-spendings'
                    }
                }
            ]
        }),
        token,
        path: ''
    })).then((response) => {
        if (response.ok) {
            response.json().then((spreadSheetData) => {
                resolve(spreadSheetData.spreadsheetId);
            });
        }
    }));
}

export default {
    createRequest,
    createSpreadSheet
};
