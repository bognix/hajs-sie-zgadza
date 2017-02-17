import authConfig from 'auth.json';
import React from 'react';

export default class FirebaseLogin extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            disabled: true,
            loggedIn: false
        };
    }

    componentDidMount () {
        const scriptElement = document.createElement('script');

        scriptElement.src = '//www.gstatic.com/firebasejs/3.6.9/firebase.js';
        scriptElement.async = true;
        scriptElement.onload = () => {
            const {apiKey, authDomain, databaseURL, storageBucket, messagingSenderId} = authConfig.firebase,
                config = {
                    apiKey,
                    authDomain,
                    databaseURL,
                    storageBucket,
                    messagingSenderId
                };

            window.firebase.initializeApp(config);

            this.setState({
                disabled: false
            });
        };
        document.getElementsByTagName('script')[0].parentNode.appendChild(scriptElement);
    }

    handleLogin (event) {
        event.preventDefault();

        const provider = new window.firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/plus.login');
        provider.addScope('https://www.googleapis.com/auth/spreadsheets');

        window.firebase.auth().signInWithPopup(provider).
        then((result) => {
            const {accessToken} = result.credential;

            this.setState({
                loggedIn: true
            });

            this.props.onSuccess({
                access_token: accessToken
            });
        }).
        catch((error) => {
            // TODO  error handling
        });
    }

    getLink () {
        if (this.state.loggedIn) {
            return <span>Welcome!</span>;
        }

        return <input disabled={this.state.disabled}
            type="button" value="Log in Using Google"
            onClick={this.handleLogin.bind(this)}/>;
    }

    render () {
        const link = this.getLink();

        return <div>{link}</div>;
    }
}
