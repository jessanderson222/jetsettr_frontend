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

  //fetch country data from jetsettr_backend
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/countries")
      .then(res => res.json())
      .then(data =>
        this.setState({ countries: data, filteredCountries: data })
      );
  }

  //filter countries by region, send to SearchFilter
  filterCountries = myRegion => {
    let countriesCopy = [...this.state.countries];
    let newFilterMap = countriesCopy.filter(
      country => country.region === myRegion
    );
    this.setState({
      filteredCountries: newFilterMap
    });
  };

  //send to SignUpForm to handle submission
  signupFormSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    this.createUser(userInfo);
    // this.props.history.push("/");
  };

  //send to LoginForm to handle submission
  loginSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    this.getUser(userInfo);
  };

  //send to NewTripForm to handle submission
  createTripSubmitHandler = (e, tripInfo, id) => {
    e.preventDefault();
    this.createTrip(tripInfo, id);
  };

  //Send to TripCard via UserContainer to handle delete button
  deleteTripSubmitHandler = (e, tripId) => {
    e.preventDefault();
    this.deleteTrip(tripId);
  };

  //this feature is on hold for now
  // editTripSubmitHandler = (e, updatedTripInfo) => {
  //   e.preventDefault();
  //   this.editTrip(updatedTripInfo);
  // };

  //send post request to jetsettr_backend, info coming from NewTripForm
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

  //deleting trip from the database jetsettr_backend
  deleteTrip = tripId => {
    console.log(localStorage);
    fetch(`http://localhost:3000/api/v1/trips/${tripId}`, {
      method: "delete"
    })
      .then(res => res.json())
      .then(json => console.log(json, "deleted!"));
  };

  //post request using the info from SignUpForm
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

  //login a returning user using their username and password
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
    // console.log("in app", this.state.user);
    let filteredCountryDisplay = this.state.filteredCountries.map(country => (
      <CountryContainer
        user={this.state.user}
        key={country.id}
        country={country}
      />
    ));
    // console.log(filteredCountryDisplay);
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
            render={() => (
              <div>
                <SearchFilter
                  filteredCountries={this.state.filteredCountries}
                  filterCountries={this.filterCountries}
                />
                {filteredCountryDisplay}
              </div>
            )}
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
                deleteTripSubmitHandler={this.deleteTripSubmitHandler}
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
