import React from 'react';
import LoginControl from './login';
import {Link} from 'react-router';


export default class App extends React.Component {
    render() {
        return <div>
            <LoginControl/>
            <nav>
                <ul>
                    <li><Link to="/spends">My Spends</Link></li>
                </ul>
            </nav>
            {this.props.children}
        </div>
    }
}
