import { NOTIFY } from "../actionTypes/notificationTypes";

export const addNotification = (notify) => {
  return {
    type: NOTIFY.ADD_NOTIFICATION,
    payload: notify,
  };
};

export const removeNotification = (notify) => {
  return {
    type: NOTIFY.REMOVE_NOTIFICATION,
    payload: notify,
  };
};
