import React from 'react';
import LoginControl from './login';
import {Spendings} from './spend';

export default class App extends React.Component {
    render() {
        return <div>
            <LoginControl/>
            <Spendings/>
        </div>
    }
}
