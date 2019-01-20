import React from "react";

class NewTripForm extends React.Component {
  state = {
    newTripName: "",
    newTripPicture: "",
    newTripDescription: "",
    newTripRating: "",
    newTripPrice: "",
    newTripCountry_id: "",
    newTripUser_id: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h2>Share Your Trip!</h2>
        <form onSubmit={e => this.props.createTripSubmitHandler(e, this.state)}>
          <input
            type="text"
            name="newTripName"
            placeholder="What will you call your trip?"
            value={this.state.newTripName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="newTripPicture"
            placeholder="picture URL"
            value={this.state.newTripPicture}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="newTripDescription"
            placeholder="describe your trip"
            value={this.state.newTripDescription}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="signupEmail"
            placeholder="email"
            value={this.state.signupEmail}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="signupPassword"
            placeholder="password"
            value={this.state.signupPassword}
            onChange={this.handleChange}
          />
          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default NewTripForm;
