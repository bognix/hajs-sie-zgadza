import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
import App from 'modules/app';
import Balance from 'modules/balance';
import Planner from 'modules/planner';
import React from 'react';
import {render} from 'react-dom';

import 'app.scss';
import 'Roboto-Regular.ttf';

render(
    <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRedirect to="/balance"></IndexRedirect>
        <Route path="/balance" component={Balance}></Route>
        <Route path="/planner" component={Planner}></Route>
    </Route>
</Router>, document.getElementById('appContainer'));
