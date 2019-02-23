import React from "react";
import { Redirect } from "react-router";
import { Form, Button } from "react-bootstrap";

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
      return <Redirect to="/profile" />;
    } else {
      return (
        <div>
          <br />

          <Form onSubmit={e => this.props.loginSubmitHandler(e, this.state)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="loginUsername"
                placeholder="user name"
                value={this.state.loginUsername}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="loginPassword"
                placeholder="password"
                value={this.state.loginPassword}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
        </div>
      );
    }
  }
}

export default LoginForm;
