import { startProductRequest, productSuccess } from "../actions/productActions";
import { addNotification } from "../actions/notificationActions";

export function getProducts() {
  return (dispatch) => {
    dispatch(startProductRequest());
    fetch("http://192.168.0.122:9000/api/products/get_products", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(productSuccess(data.content)));
  };
}

export function addProduct(product) {
  return async (dispatch) => {
    await fetch("http://192.168.0.122:9000/api/products/add_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        product_name: product.product_name,
      }),
    })
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
