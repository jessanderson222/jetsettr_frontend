import React, { Component } from "react";
import TripCard from "../Components/TripCard";
import NewTripForm from "../Components/NewTripForm";

export default class UserContainer extends Component {
  state = {
    click: false
  };

  clickNewTripButton = () => {
    this.setState({
      click: !this.state.click
    });
    console.log(this.state.click);
  };

  render() {
    console.log(this.state.click);
    if (this.props.user) {
      if (this.state.click === true) {
        return (
          <NewTripForm
            user={this.props.user}
            countries={this.props.countries}
            createTripSubmitHandler={this.props.createTripSubmitHandler}
            createTrip={this.props.createTrip}
          />
        );
      } else {
        return (
          <div>
            <h2>{this.props.user.username}</h2>
            <img alt="" height="200px" src={this.props.user.profile_picture} />
            <p>
              location: {this.props.user.location}
              <br />
              email: {this.props.user.email}
              <br />
            </p>
            <br />
            <h2>{this.props.user.username}'s Trips:</h2>
            {this.props.user.trips.map(trip => (
              <TripCard parent="UserContainer" />
            ))}
            <button onClick={this.clickNewTripButton}>Post Trip</button>
          </div>
        );
      }
    } else {
      return <h4>Please sign in!</h4>;
    }
  }
}
