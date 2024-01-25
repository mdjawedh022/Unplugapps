import axios from "axios";
import {
   DELETE_TABLE_FAILED,
  DELETE_TABLE_REQUEST,
  DELETE_TABLE_SUCCESS,
  GET_DATA_FAILED,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  POST_DETAIL_FAILED,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCCESS,
} from "./actionTypes";

export const gettableRequest = () => ({ type: GET_DATA_REQUEST });
export const gettableSuccess = (payload) => ({
  type: GET_DATA_SUCCESS,
  payload,
});
export const gettableFailed = () => ({ type: GET_DATA_FAILED });

export const TableDataGet = () => async (dispatch) => {
  dispatch(gettableRequest());
  try {
    const data = await axios.get(`http://5.189.180.8:8010/detail`);
      //  console.log(data)
    dispatch(gettableSuccess(data));
  } catch (err) {
    console.log(err);
    dispatch(gettableFailed(err));
  }
};


const deleteTableRequest = () => ({
  type: DELETE_TABLE_REQUEST,
});

const deleteTableSuccess = (id) => ({
  type: DELETE_TABLE_SUCCESS,
  payload: id,
});

const deleteTableFailed = (error) => ({
  type: DELETE_TABLE_FAILED,
  payload: error,
});


// Delete function
export const deleteTableData = (id) => async (dispatch) => {
  dispatch(deleteTableRequest());
  try {
    await axios.delete(`http://5.189.180.8:8010/detail/${id}`);
    dispatch(deleteTableSuccess(id));
  } catch (error) {
    console.log(error);
    dispatch(deleteTableFailed(error));
  }
};

const postDetailRequest = () => ({
  type: POST_DETAIL_REQUEST,
});

const postDetailSuccess = (data) => ({
  type: POST_DETAIL_SUCCESS,
  payload: data,
});

const postDetailFailed = (error) => ({
  type: POST_DETAIL_FAILED,
  payload: error,
});

export const postDetailData = (postData) => async (dispatch) => {
  dispatch(postDetailRequest());
  try {
    const response = await axios.post(
      "http://5.189.180.8:8010/detail",
      postData
    );
    dispatch(TableDataGet())
    dispatch(postDetailSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(postDetailFailed(error));
  }
};