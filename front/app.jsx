import {Spendings}from './spend';
import {render} from 'react-dom';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router'

render(
    (
        <Router history={browserHistory}>
            <Route path="/(:title)" component={Spendings}/>
        </Router>
    ),
    document.getElementById('appContainer')
);
