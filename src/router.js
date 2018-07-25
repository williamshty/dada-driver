import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/LoginPage';
import RegistrationPage from './routes/RegistrationPage'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
