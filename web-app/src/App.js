import React, { Component } from 'react';
import { HashRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import './App.css';

import constants from "./Components/Constants";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import View from "./Components/View";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={constants.routes.signin} component={SignIn} />
          <Route exact path={constants.routes.signup} component={SignUp} />
          <Route exact path={constants.routes.views} component={View} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
