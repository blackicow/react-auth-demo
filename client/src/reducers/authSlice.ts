import isEmpty from "../validation/is-empty";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken.ts";
import jwt_decode from "jwt-decode";

export interface authState {
  isAuthenticated: Boolean;
  user: {};
}

const initialState: authState = {
  isAuthenticated: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !isEmpty(action.payload);
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export const loginUser = (userData, history) => (dispatch) => {
  axios.post("/api/users/login", userData).then((res) => {
    // Save to localstorage
    const { token } = res.data;

    // Set token to localstorage
    localStorage.setItem("jwtToken", token);

    // Set token to Auth header
    setAuthToken(token);

    // Decode token to get user data
    const decoded = jwt_decode(token);

    // Set current user
    dispatch(setCurrentUser(decoded));
    history.push("/dashboard");
  });
};

export const registerUser = (userData, history) => () => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"));
};

export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future request
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export default authSlice.reducer;
