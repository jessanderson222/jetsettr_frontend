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
import SearchFilter from "./Components/SearchFilter";

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

  createTripSubmitHandler = (e, tripInfo, id) => {
    e.preventDefault();
    this.createTrip(tripInfo, id);
  };

  deleteTripSubmitHandler = (e, tripId) => {
    e.preventDefault();
    this.deleteTrip(tripId);
  };

  editTripSubmitHandler = (e, updatedTripInfo) => {
    e.preventDefault();
    this.editTrip(updatedTripInfo);
  };

  addNewTripToList(tripInfo) {
    // let updatedCountries = [...this.state.filteredCountries, tripInfo];
    // this.setState({
    //   filteredCountries: updatedCountries
    // }); ---Need to figure this one out :)
  }

  createTrip = (tripInfo, id) => {
    let countryId = parseInt(tripInfo.newTripCountry_id);
    console.log(countryId, tripInfo, id);
    fetch("http://localhost:3000/api/v1/trips", {
      method: "POST",
      headers: {
        Authorization: `Bearer <token>`,
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        picture: tripInfo.newTripPicture,
        rating: tripInfo.newTripRating,
        description: tripInfo.newTripDescription,
        price: tripInfo.newTripPrice,
        name: tripInfo.newTripName,
        country_id: countryId,
        user_id: id
      })
    })
      .then(resp => resp.json())
      .then(resp => {
        this.addNewTripToList(resp);
      });
  };

  deleteTrip = tripId => {
    console.log(localStorage);
    fetch(`http://localhost:3000/api/v1/trips/${tripId}`, {
      method: "delete"
    })
      .then(res => res.json())
      .then(json => console.log(json, "deleted!"));
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
              <LoginForm
                loginSubmitHandler={this.loginSubmitHandler}
                user={this.state.user}
              />
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
                deleteTrip={this.deleteTrip}
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
