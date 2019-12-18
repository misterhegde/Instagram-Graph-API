import "./App.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Landingpage from "./components/LandingPage";
import Profile from "./components/Profile";
import Default from "./components/Default";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Landingpage} />
          <Route path="/profile" component={Profile} />
          <Route component={Default} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
