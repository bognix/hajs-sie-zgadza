import React from 'react';
import {render} from 'react-dom';
import {LoginControl} from './login';
import {Spendings}from './spend';

render(
    (
        <div>
            <LoginControl/>
            <Spendings/>
        </div>
    ),
    document.getElementById('appContainer')
);
