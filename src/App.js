import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import CountryContainer from "./Containers/CountryContainer";
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import UserContainer from "./Containers/UserContainer";

class App extends React.Component {
  state = {
    user: "",
    trip: "",
    countries: [],
    filteredCountries: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/countries")
      .then(res => res.json())
      .then(data =>
        this.setState({ countries: data, filteredCountries: data })
      );
  }

  signupFormSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    this.createUser(userInfo);
    // this.props.history.push("/");
  };

  loginSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    this.getUser(userInfo);
  };

  createTripSubmitHandler = (e, tripInfo) => {
    e.preventDefault();
    this.createTrip(tripInfo);
  };

  createTrip = tripInfo => {
    fetch("http://localhost:3000/api/v1/trips", {
      method: "POST",
      headers: {
        Authorization: `Bearer <token>`,
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        trip: {
          picture: tripInfo.newTripPicture,
          rating: tripInfo.newTripRating,
          description: tripInfo.newTripDescription,
          price: tripInfo.newTripPrice,
          name: tripInfo.newTripName,
          country_id: tripInfo.newTripCountry_Id,
          user_id: tripInfo.newTripUser_Id
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
    fetch("http://localhost:3000/api/v1/login", {
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
        <Navbar />
        <Switch>
          <Route
            path="/signup"
            render={() => (
              <SignUpForm
                signupFormSubmitHandler={this.signupFormSubmitHandler}
              />
            )}
          />
          <Route
            path="/login"
            render={() => (
              <LoginForm loginSubmitHandler={this.loginSubmitHandler} />
            )}
          />
          <Route
            path="/index"
            render={() =>
              this.state.filteredCountries.map(country => (
                <CountryContainer
                  user={this.state.user}
                  key={country.id}
                  country={country}
                />
              ))
            }
          />
          <Route
            path="/profile"
            render={() => (
              <UserContainer
                user={this.state.user}
                countries={this.state.countries}
                createTripSubmitHandler={this.createTripSubmitHandler}
                createTrip={this.createTrip}
              />
            )}
          />
          <Route path="/" render={() => <Home />} />
        </Switch>
      </div>
    );
  }
}

export default App;
