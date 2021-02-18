import { AUTH } from "../actionTypes/authenticationActionTypes";
import { initialState } from "../initialState";

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.AUTHENTICATED:
      return {
        ...state,
        authenticated: action.payload.authStatus,
        token: action.payload.token,
      };

    case AUTH.SET_USER_FIRST_NAME:
      return {
        ...state,
        user_first_name: action.payload,
      };

    case AUTH.SET_USER_LAST_NAME:
      return {
        ...state,
        user_last_name: action.payload,
      };

    case AUTH.SET_USER_EMAIL_ADDRESS:
      return {
        ...state,
        user_email_address: action.payload,
      };

    case AUTH.SET_USER_GROUP_TYPE:
      return {
        ...state,
        user_group_type: action.payload,
      };

    case AUTH.SET_USER_TYPE:
      return {
        ...state,
        user_type: action.payload,
      };

    case AUTH.SET_USER_PASSWORD:
      return {
        ...state,
        user_password: action.payload,
      };
    default:
      return state;
  }
};
