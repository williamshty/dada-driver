import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage/IndexPage';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage'
import PhoneVerificationPage from './routes/PhoneVerificationPage/PhoneVerificationPage'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/verification" component={PhoneVerificationPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
