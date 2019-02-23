import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <div>
      <Navbar id="nav">
        <Navbar.Brand>
          <Link to="/">
            <div className="navitem">Jetsettr</div>
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/index">
              <div className="navitem">Trips</div>
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/profile">
              <div className="navitem">My Profile</div>
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/login">
              <div className="navitem">Login</div>
            </Link>
          </Nav.Link>
          <Nav.Link href="/signup">
            {" "}
            <Link to="/signup">
              <div className="navitem">Sign UP</div>
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
