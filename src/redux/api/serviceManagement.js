import {
  setServiceRequest,
  setServiceRequestSuccess,
  getSubClientServiceRequest,
  setSubClientServiceRequests,
} from "../actions/serviceActions";
import { addNotification } from "../actions/notificationActions";
import { BACKEND_SETTINGS } from "../../appSettings";

export function getSubClientServiceRequestsByID(payload) {
  return async (dispatch) => {
    dispatch(getSubClientServiceRequest());
    await fetch(
      `http://${BACKEND_SETTINGS.IP}:${BACKEND_SETTINGS.PORT}/api/service/get_specific_service_request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setSubClientServiceRequests(data.content));
      });
  };
}

export function addServiceRequest(service) {
  return async (dispatch) => {
    dispatch(setServiceRequest());
    console.log(service);
    await fetch(
      `http://${BACKEND_SETTINGS.IP}:${BACKEND_SETTINGS.PORT}/api/service/add_service_request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(service),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setServiceRequestSuccess(data));
        dispatch(
          addNotification({
            type: "success",
            message: `Service has been successfully added, id ${data?.id?.docket_number}.`,
          })
        );
      });
  };
}
