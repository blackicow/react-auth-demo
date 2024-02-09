import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks.ts";
import { logoutUser } from "../../reducers/authSlice.ts";

const Navbar = () => {
  const auth = useAppSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const dispatch = useAppDispatch();

  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a href="" onClick={onLogoutClick} className="nav-link">
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Login Database
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mobile-nav">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
