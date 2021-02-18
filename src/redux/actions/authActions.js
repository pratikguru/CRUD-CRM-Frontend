import { AUTH } from "../actionTypes/authenticationActionTypes";
import { BACKEND_URL } from "../initialState";

import axios from "axios";

export const login = (token) => ({
  type: AUTH.AUTHENTICATED,
  payload: token,
});

export const setUserFirstName = (name) => ({
  type: AUTH.SET_USER_FIRST_NAME,
  payload: name,
});

export const setUserLastName = (name) => ({
  type: AUTH.SET_USER_LAST_NAME,
  payload: name,
});

export const setUserEmailAddress = (email_address) => ({
  type: AUTH.SET_USER_EMAIL_ADDRESS,
  payload: email_address,
});

export const setUserGroupType = (group_type) => ({
  type: AUTH.SET_USER_GROUP_TYPE,
  payload: group_type,
});

export const setUserType = (user_type) => ({
  type: AUTH.SET_USER_TYPE,
  payload: user_type,
});

export const setUserPassword = (user_password) => ({
  type: AUTH.SET_USER_PASSWORD,
  payload: user_password,
});

export const loginUser = (login_credentials) => {
  return (dispatch) => {
    console.log(login_credentials);
    fetch(BACKEND_URL + "/api/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login_credentials),
    })
      .then((response) => {
        if (response.status === 200) {
          const data = response.json();
          data.then((value) => {
            console.log(value);
            dispatch(login({ token: value.token, authStatus: 1 }));
            localStorage.setItem("token", value.token);
          });
        } else {
          const data = response.json();
          data.then((value) => {
            console.log(value);
            dispatch(login({ token: "", authStatus: 0 }));
            localStorage.setItem("token", "");
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
