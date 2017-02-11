import {Link} from 'react-router';
import LoginControl from './login';
import React from 'react';

export default class App extends React.Component {
    render () {

        return <div>
            <LoginControl/>
            <nav>
                <ul>
                    <li>
                        <Link to="/recent">Recent</Link>
                    </li>
                </ul>
            </nav>
            {this.props.children}
        </div>;

    }
}
