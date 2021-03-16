import { startClientsRequest, clientsSuccess } from "../actions/clientActions";

export function getClients() {
  return (dispatch) => {
    dispatch(startClientsRequest());
    fetch("http://192.168.0.122:9000/api/clients/get_clients", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(clientsSuccess(data.message));
      });
  };
}

export const addNewClient = (client_name) => {
  return async (dispatch) => {
    await fetch("http://127.0.0.1:9000/api/clients/add_client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        client_name: client_name,
        sub_clients: {},
      }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(getClients()));
  };
};
