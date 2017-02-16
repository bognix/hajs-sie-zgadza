import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
import App from 'modules/app';
import Balance from 'modules/balance';
import Planner from 'modules/planner';
import React from 'react';
import {render} from 'react-dom';

import 'app.scss';
import 'icons/ic_add_black_24px.svg';
import 'icons/ic_chevron_left_black_24px.svg';
import 'icons/ic_chevron_right_black_24px.svg';
import 'icons/ic_radio_button_checked_black_24px.svg';
import 'icons/ic_radio_button_unchecked_black_24px.svg';
import 'icons/ic_cancel_black_24px.svg';
import 'icons/ic_clear_black_24px.svg';
import 'icons/ic_search_black_24px.svg';
import 'icons/ic_file_download_black_24px.svg';
import 'icons/ic_attach_money_black_24px.svg';

render(
    <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRedirect to="/balance"></IndexRedirect>
        <Route path="/balance" component={Balance}></Route>
        <Route path="/planner" component={Planner}></Route>
    </Route>
</Router>, document.getElementById('appContainer'));
