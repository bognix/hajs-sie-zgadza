import React from 'react';
import {render} from 'react-dom';
import {IndexRedirect, Route, Router, browserHistory} from 'react-router';
import App from 'modules/app';
import Balance from 'modules/balance';

// @TODO extract css to seperate file so they are not included via JS
// import 'app.scss';

render(
    <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRedirect to="/balance"></IndexRedirect>
        <Route path="/balance" component={Balance}></Route>
    </Route>
</Router>, document.getElementById('appContainer'));
