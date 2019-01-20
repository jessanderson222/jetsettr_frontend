import React, { Component } from "react";
import TripContainer from "./TripContainer";

export default class CountryContainer extends Component {
  render() {
    console.log(this.props.country);
    return (
      <div>
        <h1>{this.props.country.name}</h1>
        <TripContainer />
      </div>
    );
  }
}
