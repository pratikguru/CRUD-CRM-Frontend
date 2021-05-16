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
    loading: false,
    users: [],
  },
  navigation: {
    current_tab: { current_tab: "dashboard" },
    current_client_tab: { current_tab: "clients" },
  },
  client: {
    client_name: "",
    loading: false,
    loadingSubClients: false,
    clients: [],
    sub_clients: [],
  },
  product: {
    products: [],
    loading: false,
  },
  service: {
    services: [],
    loadingServices: false,
  },
  notifications: {
    notificationsList: [
      {
        message: "Welcome!",
        type: "info",
      },
    ],
  },
};

export const BACKEND_URL = "http://localhost:9000";
