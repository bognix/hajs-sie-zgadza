import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import App from './modules/app';
import Spendings from './modules/spend';
//@TODO extract css to seperate file so they are not included via JS
import 'app.scss';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRedirect to="/spends"></IndexRedirect>
        <Route path="/spends" component={Spendings}></Route>
    </Route>
  </Router>,
  document.getElementById('appContainer')
);
