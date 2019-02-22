import React from "react";

const TripCard = props => {
  if (props.parent === "CountryContainer") {
    return (
      <div className="trip-box">
        <h3 className="trip-name">{props.trip.name}</h3>
        <img
          className="trip-image"
          alt={props.trip.name}
          height="200px"
          src={props.trip.picture}
        />
        <p className="trip-info">
          Rating: {props.trip.rating}
          <br />
          Price: {props.trip.price}
          <br />
          {props.trip.description}
        </p>
      </div>
    );
  } else {
    return (
      <div className="trip-box">
        <h3 className="trip-name">{props.trip.name}</h3>
        <img
          className="trip-image"
          alt={props.trip.name}
          height="200px"
          src={props.trip.picture}
        />
        <p className="trip-info">
          Rating: {props.trip.rating}
          <br />
          Price: {props.trip.price}
          <br />
          {props.trip.description}
        </p>
        <button
          className="delete-trip-button"
          onClick={e => props.deleteTripSubmitHandler(e, props.trip.id)}
        >
          Delete Trip
        </button>
      </div>
    );
  }
};

export default TripCard;
