import { NAV } from "../actionTypes/authenticationActionTypes";
import { initialState } from "../initialState";

export const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAV.SET_CURRENT_TAB:
      return {
        ...state,
        current_tab: action.payload,
      };
    case NAV.SET_CURRENT_CLIENT_TAB:
      return {
        ...state,
        current_client_tab: action.payload,
      };
    default:
      return state;
  }
};
