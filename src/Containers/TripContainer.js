import React, { Component } from "react";
import TripCard from "../Components/TripCard";

export default class TripContainer extends Component {
  render() {
    return (
      <div>
        <TripCard trip={this.props.trip} parent={this.props.parent} />
      </div>
    );
  }
}
