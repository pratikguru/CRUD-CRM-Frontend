import { startProductRequest, productSuccess } from "../actions/productActions";
import { addNotification } from "../actions/notificationActions";
import { BACKEND_SETTINGS } from "../../appSettings";

export function getProducts() {
  return (dispatch) => {
    dispatch(startProductRequest());
    fetch(
      `http://${BACKEND_SETTINGS.IP}:${BACKEND_SETTINGS.PORT}/api/products/get_products`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => dispatch(productSuccess(data.content)));
  };
}

export function addProduct(product) {
  return async (dispatch) => {
    await fetch(
      `http://${BACKEND_SETTINGS.IP}:${BACKEND_SETTINGS.PORT}/api/products/add_product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          product_name: product.product_name,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(getProducts());
        dispatch(
          addNotification({
            type: "success",
            message: "Product has been successfully added!",
          })
        );
      });
  };
}
