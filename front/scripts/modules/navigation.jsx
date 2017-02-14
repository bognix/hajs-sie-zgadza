import GoogleLogin from 'modules/googleLogin';
import {Link} from 'react-router';
import React from 'react';

export default class Navigation extends React.Component {
    render () {
        return (
        <nav className="navigation">
            <GoogleLogin onSuccess={this.props.onLoginSuccess.bind(this)}/>
            <ul className="nav-item">
                <li>
                    <Link to="/balance">Balance</Link>
                </li>
                <li>
                    <Link to="/planner">Planner</Link>
                </li>
            </ul>
        </nav>);
    }
}
