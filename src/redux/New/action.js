import axios from "axios";
import {
  POST_ITEM_FAILED,
  POST_ITEM_REQUEST,
  POST_ITEM_SUCCESS,
} from "./actionType";

export const postItemRequest = () => ({ type: POST_ITEM_REQUEST });
export const postItemSuccess = () => ({ type: POST_ITEM_SUCCESS });
export const postItemFailed = () => ({ type: POST_ITEM_FAILED });

export const itemPost = (formData) => (dispatch) => {
  dispatch(postItemRequest());

  return axios
    .post(`http://5.189.180.8:8010/item`, formData)
    .then((res) => {
      dispatch(postItemSuccess(res.data));
      console.log(res)
    })
    .catch((err) => {
      dispatch(postItemFailed());
    });
};

// http://5.189.180.8:8010/item
