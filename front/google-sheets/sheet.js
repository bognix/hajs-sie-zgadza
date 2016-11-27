export function getAll() {
    return new Promise(function(resolve, reject) {
        fetch(createRequest({path: 'values/all!A:B'}))
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                resolve(data);
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

function getCookie(cname) {
    const name = cname + "=",
        ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
