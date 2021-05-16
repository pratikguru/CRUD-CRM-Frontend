import SERVICE from "../actionTypes/serviceActionTypes";
import { initialState } from "../initialState";

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVICE.SET_NEW_SERVICE_REQUEST:
      return {
        ...state,
        loadingServices: true,
      };
    case SERVICE.SET_NEW_SERVICE_REQUEST_SUCCESS:
      return {
        ...state,
        loadingServices: false,
      };
    case SERVICE.GET_SERVICE_REQUESTS:
      return {
        ...state,
        loadingServices: true,
      };
    case SERVICE.GET_SERVICE_REQUESTS_SUCCESS:
      return {
        ...state,
        loadingServices: false,
        services: action.payload,
      };
    default:
      return state;
  }
};
