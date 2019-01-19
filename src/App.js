import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CountryContainer from "./Containers/CountryContainer";
import SignUpForm from "./Components/SignUpForm";

class App extends Component {
  signupFormSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    this.createUser(userInfo);
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
        this.setState({
          user: resp.user
        });
      });
    console.log("done!");
  };

  render() {
    return (
      <div className="App">
        <SignUpForm signupFormSubmitHandler={this.signupFormSubmitHandler} />
        <CountryContainer />
      </div>
    );
  }
}

export default App;
