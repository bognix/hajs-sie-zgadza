import React from 'react';

export default class LoginControl extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            loggedIn: false,
            loaded: false
        };
    }

    componentDidMount () {
        ((callback) => {
            const [node] = document.getElementsByTagName('script'),
                scriptNode = document.createElement('script');

            scriptNode.id = 'google-login';
            scriptNode.src = '//apis.google.com/js/client:platform.js';
            node.parentNode.insertBefore(scriptNode, node);
            scriptNode.onload = callback;
        })(() => {
            window.gapi.load('auth2', () => {
                this.setState({
                    loaded: true
                });

                window.gapi.auth2.init({
                    client_id: '43086560862-o7oak524aoc935iqgrglmpf4o40o3jn1.apps.googleusercontent.com',
                    scope: 'profile email https://www.googleapis.com/auth/spreadsheets'
                });

                this.renderGoogleButton();
            });
        });
    }

    logout () {
        window.gapi.auth2.getAuthInstance().signOut().then(() => {
            // TODO fix cannot read style of undefined error
            this.setState({
                loggedIn: false
            });

            this.renderGoogleButton();
        });
    }

    renderLink () {
        if (this.state.loaded) {
            return this.state.loggedIn
            ? <a href="#" onClick={this.logout.bind(this)}>Sign Out</a>
            : <div id="google-login-button"/>;
        }
    }

    renderGoogleButton () {
        window.gapi.signin2.render('google-login-button', {
            'scope': 'profile email https://www.googleapis.com/auth/spreadsheets',
            'height': 32,
            'theme': 'dark',
            'onsuccess': (response) => {
                this.setState({
                    loggedIn: true,
                    loaded: true
                });

                this.props.onSuccess(window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse());
            },
            'onfailure': () => {
                this.setState({
                    loaded: true
                });
            }
        });
    }

    render () {
        const link = this.renderLink();

        return (
            <div>
            {link}
        </div>
        );
    }
}
