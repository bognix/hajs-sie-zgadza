import FirebaseLogin from 'modules/firebaseLogin';
import {Link} from 'react-router';
import React from 'react';

export default class Navigation extends React.Component {
    render () {
        return (
        <nav className="navigation">
            <h2 className="logo">$$$ hajsy</h2>
            <ul>
                <li className="nav-item">
                    <Link to="/balance">Balance</Link>
                </li>
                <li className="nav-item">
                    <Link to="/planner">Planner</Link>
                </li>
                <li className="nav-item">
                    <FirebaseLogin onSuccess={this.props.onLoginSuccess.bind(this)}/>
                </li>
            </ul>
        </nav>);
    }
}
