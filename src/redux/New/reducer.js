import { POST_ITEM_FAILED, POST_ITEM_REQUEST, POST_ITEM_SUCCESS } from "./actionType";


const initialState = {
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_ITEM_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case POST_ITEM_SUCCESS:
      return { ...state, isLoading: false, isError: false };
    case POST_ITEM_FAILED:
      return { ...state, isLoading: false, isError: true };

    default:
      return state;
  }
};
