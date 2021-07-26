import { AUTH } from "../actionTypes/authenticationActionTypes";
import { BACKEND_URL } from "../initialState";
import { BACKEND_SETTINGS } from "../../appSettings";

import { addNotification } from "../actions/notificationActions";

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

export const getAllUsers = () => ({
  type: AUTH.GET_ALL_USERS_REQUEST,
});

export const setAllUsers = (payload) => ({
  type: AUTH.GET_ALL_USERS_SUCCESS,
  payload: payload,
});

export const getUsers = () => {
  return (dispatch) => {
    dispatch(getAllUsers());
    fetch(
      `http://${BACKEND_SETTINGS.IP}:${BACKEND_SETTINGS.PORT}/api/all_users`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let buffer = [];
        for (let key in data) {
          buffer.push(data[key]);
        }
        dispatch(setAllUsers(buffer));
      });
  };
};

export const loginUser = (login_credentials) => {
  return (dispatch) => {
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
            dispatch(login({ token: value.token, authStatus: 1 }));
            localStorage.setItem("token", value.token);
            dispatch(
              addNotification({
                type: "success",
                message: value.message,
              })
            );
          });
        } else {
          const data = response.json();
          data.then((value) => {
            dispatch(login({ token: "", authStatus: 0 }));
            localStorage.setItem("token", "");
            dispatch(
              addNotification({
                type: "error",
                message: value.message,
              })
            );
          });
        }
      })
      .catch((error) => {
        dispatch(
          addNotification({
            type: "error",
            message: error,
          })
        );
      });
  };
};
