export const initialState = {
  auth: {
    authenticated: false,
    user_first_name: "none",
    user_last_name: "none",
    user_email_address: "none@none.com",
    user_group_type: 1,
    user_type: 1,
    user_password: "",
    token: "",
  },
  navigation: {
    current_tab: "dashboard",
  },
};

export const BACKEND_URL = "http://localhost:9000";
