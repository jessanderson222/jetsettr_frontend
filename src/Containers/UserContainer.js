import React, { Component } from "react";
import TripCard from "../Components/TripCard";
import NewTripForm from "../Components/NewTripForm";
import { Redirect } from "react-router";

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
    console.log(this.state.click, this.props);
    if (this.props.user) {
      if (this.state.click === true) {
        return (
          <div>
            <Redirect to="/newtrip" />
          </div>
        );
      } else {
        return (
          <div>
            <button onClick={this.clickNewTripButton}>Post Trip</button>
            <br />
            <h2>{this.props.user.username}</h2>
            <br />
            <img alt="" height="200px" src={this.props.user.profile_picture} />
            <p>
              location: {this.props.user.location}
              <br />
              email: {this.props.user.email}
              <br />
              <button>Update Profile</button>
            </p>
            <br />
            <h2>{this.props.user.username}'s Trips:</h2>
            {this.props.user.trips.map((trip, i) => (
              <TripCard
                key={i}
                parent="UserContainer"
                trip={trip}
                deleteTrip={this.props.deleteTrip}
                deleteTripSubmitHandler={this.props.deleteTripSubmitHandler}
              />
            ))}
          </div>
        );
      }
    } else {
      return <h4>Please sign in!</h4>;
    }
  }
}
