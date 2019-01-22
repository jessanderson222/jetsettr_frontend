import React, { Component } from "react";
import TripContainer from "./TripContainer";

export default class CountryContainer extends Component {
  render() {
    if (this.props.country.trips.length !== 0) {
      return (
        <div>
          <h1>{this.props.country.name}</h1>
          {this.props.country.trips.map((trip, i) => (
            <TripContainer parent="CountryContainer" key={i} trip={trip} />
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}
