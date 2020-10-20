import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';

import Main from './Main.react.js';
import DashboardHome from './DashboardHome.react.js';
import UsStates from './UsStates.react.js';
import CountyWise from './Countywise.react.js';
import CropPerCounty from './CropPerCounty.react.js';

export default (
    <Router key={Math.random()} history={browserHistory}>
        {
            <Route path="/" component={Main}>
                <IndexRedirect to="/dashboard" />

                <Route path="/dashboard" component={DashboardHome} />
                <Route path="/UsStates" component={UsStates} />
                <Route path="/Countywise" component={CountyWise} />
                <Route path="/CropPerCounty" component={CropPerCounty} />
            </Route>
        }
    </Router>
);
