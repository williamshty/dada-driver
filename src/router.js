import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage/IndexPage';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage'
import PhoneVerificationPage from './routes/PhoneVerificationPage/PhoneVerificationPage'
import HistoryPage from './routes/HistoryPage/HistoryPage'
import TripPage from './routes/TripPage/TripPage'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/verification" component={PhoneVerificationPage} />
        <Route path="/history" component={HistoryPage} />
        <Route path="/trip" component={TripPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
