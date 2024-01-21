import {
  GET_DATA_FAILED,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  DELETE_TABLE_REQUEST,
  DELETE_TABLE_SUCCESS,
  DELETE_TABLE_FAILED,
} from "./actionTypes";

const initialState = {
  dataTable: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DATA_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case GET_DATA_SUCCESS:
      return { ...state, isLoading: false, isError: false, dataTable: payload };
    case GET_DATA_FAILED:
      return { ...state, isLoading: false, isError: true };
    case DELETE_TABLE_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case DELETE_TABLE_SUCCESS:
      // Remove the deleted item from the dataTable
      const updatedDataTable = state.dataTable.data.filter(
        (item, index) => index !== payload
      );
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataTable: {
          ...state.dataTable,
          data: updatedDataTable,
        },
      };
    case DELETE_TABLE_FAILED:
      return { ...state, isLoading: false, isError: true };

    default:
      return state;
  }
};
