import React from 'react';
import {getCookie} from '../utils/cookie';

export default class LoginControl extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    componentDidMount () {
        getCookie('token')
            ? this.setState({isLoggedIn: true})
            : this.setState({isLoggedIn: false});
    }

    render () {
        const link = !this.state.isLoggedIn
            ? <a href="/auth/google">Log In using Google</a>
            : <a href="/logout">Logout</a>;


        return <div>
            {link}
        </div>;
    }
}
