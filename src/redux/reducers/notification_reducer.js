import { NOTIFY } from "../actionTypes/notificationTypes";
import { initialState } from "../initialState";

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY.ADD_NOTIFICATION:
      const newArray = state.notificationsList;
      newArray.push(action.payload);
      console.log(newArray);
      return {
        ...state,
        notificationsList: [...newArray],
      };
    case NOTIFY.REMOVE_NOTIFICATION:
      console.log(action.payload);
      const newArr = [...state.notificationsList];
      newArr.splice(
        newArr.findIndex((i) => i === action.payload),
        1
      );
      console.log(newArr);
      return {
        ...state,
        notificationsList: newArr,
      };
    default:
      return state;
  }
};
