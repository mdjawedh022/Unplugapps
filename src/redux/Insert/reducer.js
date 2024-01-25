import { POST_MULTIPLE_FAILED, POST_MULTIPLE_REQUEST, POST_MULTIPLE_SUCCESS } from "./actionType";

const initialState = {
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_MULTIPLE_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case POST_MULTIPLE_SUCCESS:
      return { ...state, isLoading: false, isError: false };
    case POST_MULTIPLE_FAILED:
      return { ...state, isLoading: false, isError: true };

    default:
      return state;
  }
};
