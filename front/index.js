import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import App from './modules/app';
import Spendings from './modules/spend';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRedirect to="/spends/today"></IndexRedirect>
        <Route path="/spends/:filter" component={Spendings}></Route>
    </Route>
  </Router>,
  document.getElementById('appContainer')
);
