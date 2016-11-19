import {Spendings}from './spend';
import {render} from 'react-dom';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {LoginControl} from './login';

render(
    (
        <div>
            <LoginControl/>
            <Router history={browserHistory}>
                <Route path="/(:title)" component={Spendings}/>
            </Router>
        </div>
    ),
    document.getElementById('appContainer')
);
