import { POST_HEADER_FAILED, POST_HEADER_SUCCESS ,POST_HEADER_REQUEST} from "./actionType";

const initialState = {
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_HEADER_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case POST_HEADER_SUCCESS:
      return { ...state, isLoading: false, isError: false};
    case POST_HEADER_FAILED:
      return { ...state, isLoading: false, isError: true };

    default:
      return state;
  }
};
