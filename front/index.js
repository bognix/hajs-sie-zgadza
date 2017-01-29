import React from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './modules/app'

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}></Route>
  </Router>,
  document.getElementById('appContainer')
);
