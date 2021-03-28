import { CLIENT } from "../actionTypes/clientActionTypes";

export const startClientsRequest = () => ({
  type: CLIENT.SET_CLIENT_NAME_REQUEST,
});

export const clientsSuccess = (clients) => ({
  type: CLIENT.SET_CLIENT_NAME_SUCCESS,
  payload: clients,
});

export const subClientsAddRequest = () => ({
  type: CLIENT.SET_SUB_CLIENTS_NEW_REQUEST,
});

export const subClientsAddSuccess = (sub_clients) => ({
  type: CLIENT.SET_SUB_CLIENTS_NEW_SUCCESS,
  payload: sub_clients,
});
