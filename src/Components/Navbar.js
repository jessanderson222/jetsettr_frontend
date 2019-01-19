import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="navbar">
      <Link to="/">
        <li className="navitem">Home</li>
      </Link>
      <Link to="/index">
        <li className="countrycontainer">View Trips</li>
      </Link>
      <Link to="/login">
        <li className="login">Login</li>
      </Link>
      <Link to="/signup">
        <li className="signup">Sign UP</li>
      </Link>
    </ul>
  );
};

export default NavBar;
