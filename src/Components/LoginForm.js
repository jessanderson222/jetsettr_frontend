import React from "react";

class LoginForm extends React.Component {
  state = {
    loginUsername: "",
    loginPassword: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.props);
    if (this.props.user !== "") {
      return <h4>Welcome, {this.props.user.username}!</h4>;
    } else {
      return (
        <div>
          <h2>Login</h2>
          <form onSubmit={e => this.props.loginSubmitHandler(e, this.state)}>
            <input
              type="text"
              name="loginUsername"
              placeholder="username"
              value={this.state.loginUsername}
              onChange={this.handleChange}
            />

            <input
              type="text"
              name="loginPassword"
              placeholder="password"
              value={this.state.loginPassword}
              onChange={this.handleChange}
            />
            <button>Login</button>
          </form>
        </div>
      );
    }
  }
}

export default LoginForm;
