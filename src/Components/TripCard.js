import React from "react";

const TripCard = props => {
  if (props.parent === "CountryContainer") {
    return (
      <div className="trip-box">
        <img
          className="trip-image"
          alt={props.trip.name}
          height="200px"
          src={props.trip.picture}
        />
        <h5 className="trip-name">{props.trip.name}</h5>
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
        <img
          className="trip-image"
          alt={props.trip.name}
          height="200px"
          src={props.trip.picture}
        />
        <h5 className="trip-name">{props.trip.name}</h5>
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
        <br />
      </div>
    );
  }
};

export default TripCard;
