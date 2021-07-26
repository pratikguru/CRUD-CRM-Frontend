import {
  sendTestEmailRequest,
  sendTestEmailSuccess,
} from "../actions/eventActions";
import { BACKEND_SETTINGS } from "../../appSettings";
import { addNotification } from "../actions/notificationActions";

export const sendTestEmail = (email) => {
  return async (dispatch) => {
    dispatch(sendTestEmailRequest());
    await fetch(
      `http://${BACKEND_SETTINGS.IP}:${BACKEND_SETTINGS.PORT}/api/events/send_test_email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(email),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(sendTestEmailSuccess());
        dispatch(
          addNotification({
            type: "success",
            message: data.message,
          })
        );
      })
      .catch((error) => {
        dispatch(
          addNotification({
            type: "error",
            message: error.message,
          })
        );
      });
  };
};
