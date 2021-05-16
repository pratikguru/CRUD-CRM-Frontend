import {
  startClientsRequest,
  clientsSuccess,
  subClientsAddRequest,
  subClientsAddSuccess,
} from "../actions/clientActions";
import { BACKEND_SETTINGS } from "../../appSettings";
import { addNotification } from "../actions/notificationActions";

export function getClients() {
  return (dispatch) => {
    dispatch(startClientsRequest());
    fetch(
      `http://${BACKEND_SETTINGS.IP}:${BACKEND_SETTINGS.PORT}/api/clients/get_clients`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(clientsSuccess(data.message));
      });
  };
}

export const addNewClient = (client_name) => {
  return async (dispatch) => {
    await fetch(
      `http://${BACKEND_SETTINGS.IP}:${BACKEND_SETTINGS.PORT}/api/clients/add_client`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          client_name: client_name,
          sub_clients: {},
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => dispatch(getClients()));
  };
};

export const getSubClients = (sub_client_id) => {
  return (dispatch) => {
    dispatch(subClientsAddRequest());
    fetch(
      `http://${BACKEND_SETTINGS.IP}:${BACKEND_SETTINGS.PORT}/api/clients/get_sub_clients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(sub_client_id),
      }
    )
      .then((res) => res.json())
      .then((data) => dispatch(subClientsAddSuccess(data.message)));
  };
};

export const addNewSubClient = (client_information) => {
  return async (dispatch) => {
    await fetch(
      `http://${BACKEND_SETTINGS.IP}:${BACKEND_SETTINGS.PORT}/api/clients/add_sub_client`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(client_information),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(subClientsAddSuccess(data.result));
        dispatch(
          addNotification({
            type: "success",
            message: `Sub Client ${client_information.sub_client_name} has been added successfully!`,
          })
        );
      });
  };
};
