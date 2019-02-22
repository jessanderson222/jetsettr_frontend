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
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          ;
        </div>
      );
    }
  }
}

export default LoginForm;
