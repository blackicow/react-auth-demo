import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../../hooks.ts";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
