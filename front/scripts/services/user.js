function getUserSheet () {
    const db = firebase.database(),
        currentUser = firebase.auth().currentUser;

    return new Promise((resolve, reject) => {
        db.ref(`users/${currentUser.uid}`).once('value').
        then((snapshot) => {
            resolve(snapshot.val().spreadSheetId);
        }).
        catch((err) => {
            reject(err);
        });
    });
}

function setUserSheet (spreadSheetId) {
    const db = firebase.database(),
        currentUser = firebase.auth().currentUser;

    db.ref(`users/${currentUser.uid}`).set({
        spreadSheetId
    });
}

export default {
    getUserSheet,
    setUserSheet
};
