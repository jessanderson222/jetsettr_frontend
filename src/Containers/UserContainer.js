import React, { Component } from "react";
import TripCard from "../Components/TripCard";
import NewTripForm from "../Components/NewTripForm";
import { Redirect } from "react-router";
import { Button, Container, Row, Col } from "react-bootstrap";

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
            <br />

            <Container>
              <Row>
                <Col>
                  <img
                    alt=""
                    id="profilePicture"
                    src={this.props.user.profile_picture}
                  />
                </Col>
                <Col>
                  <h2 id="username">{this.props.user.username}</h2>

                  <p id="userInfo">
                    location: {this.props.user.location}
                    <br />
                    email: {this.props.user.email}
                    <br />
                    {/* <Button
                      id="update-profile-button"
                      variant="primary"
                      size="sm"
                    >
                      Update Profile
                    </Button> */}
                  </p>

                  <Button
                    id="post-trip-button"
                    onClick={this.clickNewTripButton}
                    variant="primary"
                    size="lg"
                  >
                    Post Trip
                  </Button>
                </Col>
              </Row>
            </Container>
            <br />
            {/* <Button
              id="post-trip-button"
              onClick={this.clickNewTripButton}
              variant="primary"
              size="lg"
            >
              Post Trip
            </Button> */}

            <br />
            <br />
            <h2 id="tripHeader">{this.props.user.username}'s Trips:</h2>
            <div className="trip-card">
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
          </div>
        );
      }
    } else {
      return <h4>Please sign in!</h4>;
    }
  }
}
