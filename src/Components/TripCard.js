import React from "react";

const TripCard = props => {
  if (props.parent === "CountryContainer") {
    return (
      <div>
        <h3>{props.trip.name}</h3>
        <img alt={props.trip.name} height="200px" src={props.trip.picture} />
        <p>
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
      <div>
        <h3>{props.trip.name}</h3>
        <img alt={props.trip.name} height="200px" src={props.trip.picture} />
        <p>
          Rating: {props.trip.rating}
          <br />
          Price: {props.trip.price}
          <br />
          {props.trip.description}
        </p>
        <button onClick={e => props.deleteTripSubmitHandler(e, props.trip.id)}>
          Delete Trip
        </button>
      </div>
    );
  }
};

export default TripCard;
