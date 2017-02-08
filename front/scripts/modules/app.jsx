import React from 'react';
import LoginControl from './login';
import {Link} from 'react-router';

export default class App extends React.Component {
    render () {

        return <div>
            <LoginControl/>
            <nav>
                <ul>
                    <li>
                        <Link to="/recent">Recent</Link>
                    </li>
                    <li>
                        <Link to="/incomes">My Inocomes</Link>
                    </li>
                    <li>
                        <Link to="/incomes">My Inocomes</Link>
                    </li>
                </ul>
            </nav>
            {this.props.children}
        </div>;

    }
}
