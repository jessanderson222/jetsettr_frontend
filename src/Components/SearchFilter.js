import React from "react";

class SearchFilter extends React.Component {
  handleChange = e => {
    console.log(e.target.value);
    this.props.filterCountries(e.target.value);
  };

  render() {
    return (
      <div>
        <h3>View Trips by region:</h3>
        <form>
          <select onChange={this.handleChange}>
            <option>Africa</option>
            <option>Americas</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>Oceania</option>
            <option>Polar</option>
          </select>
        </form>
      </div>
    );
  }
}

export default SearchFilter;
