import React from "react";

class SignUpForm extends React.Component {
  state = {
    signupUsername: "",
    signupLocation: "",
    signupProfile_picture: "",
    signupEmail: "",
    signupPassword: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={e => this.props.signupFormSubmitHandler(e, this.state)}>
          <input
            type="text"
            name="signupUsername"
            placeholder="username"
            value={this.state.signupUsername}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="signupLocation"
            placeholder="location"
            value={this.state.signupLocation}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="signupProfile_picture"
            placeholder="profile picture"
            value={this.state.signupProfile_picture}
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

export default SignUpForm;
