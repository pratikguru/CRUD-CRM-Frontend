import { EVENT_ACTIONS } from "../actionTypes/eventActionTypes";

export const sendTestEmailRequest = () => {
  return {
    type: EVENT_ACTIONS.SEND_TEST_EMAIL_REQUEST,
  };
};

export const sendTestEmailSuccess = () => {
  return {
    type: EVENT_ACTIONS.SEND_TEST_EMAIL_SUCCESS,
  };
};
