import { NAV } from "../actionTypes/authenticationActionTypes";

export const setNav = (nav) => ({
  type: NAV.SET_CURRENT_TAB,
  payload: nav,
});
