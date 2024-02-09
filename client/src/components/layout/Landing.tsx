import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks.ts";

const Landing = ({ history }) => {
  const auth = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, []);
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Demo Page</h1>
              <hr />
              <Link to="/register" className="btn btn-lg btn-info mr-2">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-lg btn-info">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
