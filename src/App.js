import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import CountryContainer from "./Containers/CountryContainer";
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";

class App extends React.Component {
  state = {
    user: ""
  };

  signupFormSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    this.createUser(userInfo);
    // this.props.history.push("/");
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
      .then(user => {
        localStorage.setItem("token", user.jwt);
        this.setState({
          user: user
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

  // componentDidMount() {
  //   fetch("http://localhost:3000/api/v1/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         username: "new",
  //         password: "new",
  //         email: "new@email.com",
  //         location: "Newton",
  //         profile_picture:
  //           "https://upload.wikimedia.org/wikipedia/commons/9/9a/Guy_Fieri_at_Guantanamo_2.jpg"
  //       }
  //     })
  //   })
  //     .then(r => r.json())
  //     .then(console.log);
  // }

  render() {
    console.log("in app", this.state.user);
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/index" component={CountryContainer} />
          <Route path="/" component={Home} />
        </Switch>
        <SignUpForm />
      </div>
    );
  }
}

export default App;
