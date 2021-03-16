import { CLIENT } from "../actionTypes/clientActionTypes";

export const startClientsRequest = () => ({
  type: CLIENT.SET_CLIENT_NAME_REQUEST,
});

export const clientsSuccess = (clients) => ({
  type: CLIENT.SET_CLIENT_NAME_SUCCESS,
  payload: clients,
});
