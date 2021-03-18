import { PRODUCT } from "../actionTypes/productActionTypes";

export const startProductRequest = () => ({
  type: PRODUCT.SET_PRODUCT_NAME_REQUEST,
});

export const productSuccess = (clients) => ({
  type: PRODUCT.SET_PRODUCT_NAME_SUCCESS,
  payload: clients,
});
