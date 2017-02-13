import {getCookie} from '../utils/cookie';
import React from 'react';

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
        const link = this.state.isLoggedIn
            ? <a href="/logout">Logout</a>
            : <a href="/auth/google">Log In using Google</a>;


        return (
            <div className="nav-item">{link}</div>
        );
    }
}
