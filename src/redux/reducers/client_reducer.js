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
    case CLIENT.SET_SUB_CLIENTS_NEW_REQUEST:
      return {
        ...state,
        loadingSubClients: true,
      };
    case CLIENT.SET_SUB_CLIENTS_NEW_SUCCESS:
      return {
        ...state,
        loadingSubClients: false,
        sub_clients: action.payload,
      };
    default:
      return state;
  }
};
