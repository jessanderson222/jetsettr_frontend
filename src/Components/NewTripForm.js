import React from "react";

class NewTripForm extends React.Component {
  state = {
    newTripName: "",
    newTripPicture: "",
    newTripDescription: "",
    newTripCountry_id: "",
    newTripPrice: "",
    newTripRating: "",
    newTripUser_id: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.state, this.props.user.id);
    let countryArray = this.props.countries.map(country => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ));
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
          <select
            onChange={this.handleChange}
            name="newTripCountry_id"
            value={this.state.newTripCountry_id}
          >
            {countryArray}
          </select>
          <select
            name="newTripPrice"
            onChange={this.handleChange}
            value={this.state.newTripPrice}
          >
            <option>$</option>
            <option>$$</option>
            <option>$$$</option>
            <option>$$$$</option>
            <option>$$$$$</option>
          </select>
          <select
            onChange={this.handleChange}
            name="newTripRating"
            value={this.state.newTripRating}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <input
            type="hidden"
            name="newTripUser_id"
            value={(this.state.newTripUser_id = this.props.user.id)}
          />
          <button>Submit Trip</button>
        </form>
      </div>
    );
  }
}

export default NewTripForm;
