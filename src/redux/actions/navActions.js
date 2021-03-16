import { NAV } from "../actionTypes/authenticationActionTypes";

export const setNav = (nav) => ({
  type: NAV.SET_CURRENT_TAB,
  payload: nav,
});

export const setClientNav = (nav) => ({
  type: NAV.SET_CURRENT_CLIENT_TAB,
  payload: nav,
});
