import { PRODUCT } from "../actionTypes/productActionTypes";
import { initialState } from "../initialState";

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT.SET_PRODUCT_NAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT.SET_PRODUCT_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    default:
      return state;
  }
};
