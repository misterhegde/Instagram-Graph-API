import React, { Component } from "react";
import "../App.css";
import Facebook from "./Facebook";
import API from "./API";

import axios from "axios";
//import { Switch, Route } from "react-router-dom";

class LandingPage extends Component {
  state = {
    username1: null,
    user: {
      username: null,
      accessToken: null,
      data_access_expiration_time: null,
      expiresIn: null,
      signedRequest: null,
      userID: null
    }
  };

  onFacebookLogin = (loginStatus, resultObject) => {
    if (loginStatus === true) {
      console.log(resultObject);
      console.log(loginStatus);
      console.log("logged in");

      this.setState(
        {
          username1: resultObject.user.name,
          user: {
            username: resultObject.user.name,
            accessToken: resultObject.authResponse.accessToken,
            data_access_expiration_time:
              resultObject.authResponse.data_access_expiration_time,
            expiresIn: resultObject.authResponse.expiresIn,
            signedRequest: resultObject.authResponse.signedRequest,
            uid: resultObject.authResponse.userID
          }
        },
        () =>
          console.log("Access Token set state:", this.state.user.accessToken)
      );
    } else {
      alert("Facebook login error");
    }
  };
  componentDidUpdate() {
    axios
      .post("http://localhost:3001/create", this.state.user)
      .then(response => {
        console.log("auth response", response);
      })
      .catch(error => {
        console.log("auth error", error);
      });
  }

  render() {
    const { username1 } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Instagram Insights</h1>
          <div className="App-intro">
            {!username1 && (
              <div>
                <p></p>
                <Facebook onLogin={this.onFacebookLogin}>
                  <button className="btnmaterial">Login with Facebook</button>
                </Facebook>
              </div>
            )}
            {username1 && (
              <p className="display-2">
                Welcome back, <span>{username1}</span>
              </p>
            )}
          </div>
        </header>

        <API accessToken={this.state.user.accessToken} />
      </div>
    );
  }
}

export default LandingPage;
