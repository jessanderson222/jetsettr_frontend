import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="navbar">
      <Link to="/">
        <li className="navitem">Home</li>
      </Link>
      <Link to="/index">
        <li className="navitem">View Trips</li>
      </Link>
      <Link to="/profile">
        <li className="navitem">My Profile</li>
      </Link>
      <Link to="/login">
        <li className="navitem">Login</li>
      </Link>
      <Link to="/signup">
        <li className="navitem">Sign UP</li>
      </Link>
    </ul>
  );
};

export default NavBar;
