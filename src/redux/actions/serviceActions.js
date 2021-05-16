import SERVICE from "../actionTypes/serviceActionTypes";

export const setServiceRequest = (payload) => ({
  payload: payload,
  type: SERVICE.SET_NEW_SERVICE_REQUEST,
});

export const setServiceRequestSuccess = (payload) => ({
  payload: payload,
  type: SERVICE.SET_NEW_SERVICE_REQUEST_SUCCESS,
});

export const getSubClientServiceRequest = () => ({
  type: SERVICE.GET_SERVICE_REQUESTS,
});

export const setSubClientServiceRequests = (payload) => ({
  type: SERVICE.GET_SERVICE_REQUESTS_SUCCESS,
  payload: payload,
});
