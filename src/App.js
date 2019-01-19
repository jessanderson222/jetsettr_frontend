import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import CountryContainer from "./Containers/CountryContainer";
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";
import Navbar from "./Components/Navbar";

class App extends React.Component {
  state = {
    user: ""
  };

  signupFormSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    this.createUser(userInfo);
  };

  loginSubmitHandler = (e, userInfo) => {
    debugger;
    e.preventDefault();
    debugger;
    this.getUser(userInfo);
  };

  createUser = userInfo => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: userInfo.signupUsername,
          location: userInfo.signupLocation,
          profile_picture: userInfo.signupProfile_picture,
          email: userInfo.signupEmail,
          password: userInfo.signupPassword
        }
      })
    })
      .then(resp => resp.json())
      .then(resp => {
        localStorage.setItem("token", resp.jwt);
        this.setState({
          user: resp.user
        });
      });
    console.log("done!");
  };

  getUser = userInfo => {
    fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: userInfo.loginUsername,
          password: userInfo.loginPassword
        }
      })
    })
      .then(resp => resp.json())
      .then(resp => {
        localStorage.setItem("token", resp.jwt);
        this.setState({
          user: resp.user
        });
      });
    console.log("done!");
  };

  render() {
    console.log("in app", this.state.user);
    return (
      <div className="App">
        <SignUpForm signupFormSubmitHandler={this.signupFormSubmitHandler} />
        <CountryContainer />
        <Navbar />
        <Switch>
          <Route
            path="/login"
            render={() => {
              return (
                <LoginForm
                  loginFormSubmitHandler={this.loginFormSubmitHandler}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
