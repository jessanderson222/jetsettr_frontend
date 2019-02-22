import React, { Component } from "react";
import TripContainer from "./TripContainer";

export default class CountryContainer extends Component {
  render() {
    if (this.props.country.trips.length !== 0) {
      return (
        <div>
          <h2 className="country-name">{this.props.country.name}</h2>

          <div className="trip-card">
            {this.props.country.trips.map((trip, i) => (
              <TripContainer parent="CountryContainer" key={i} trip={trip} />
            ))}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
