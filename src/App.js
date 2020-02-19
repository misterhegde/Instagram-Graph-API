import "./App.css";

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Landingpage from "./components/LandingPage";
import Default from "./components/Default";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Landingpage} />
          <Route component={Default} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
