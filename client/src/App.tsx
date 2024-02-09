import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.ts";
import { setCurrentUser, logoutUser } from "./reducers/authSlice.ts";
import NotFound from "./components/not-found/NotFound.tsx";
import { Provider } from "react-redux";

import PrivateRoute from "./components/common/PrivateRoute.tsx";

import Navbar from "./components/layout/Navbar.tsx";
import Landing from "./components/layout/Landing.tsx";

import Register from "./components/auth/Register.tsx";
import Login from "./components/auth/Login.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";

import { store } from "./store.ts";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout the user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Route exact path="/not-found" component={NotFound} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
