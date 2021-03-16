import { CLIENT } from "../actionTypes/clientActionTypes";
import { initialState } from "../initialState";

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT.SET_CLIENT_NAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CLIENT.SET_CLIENT_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: action.payload,
      };

    default:
      return state;
  }
};
