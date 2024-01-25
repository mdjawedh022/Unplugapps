import axios from "axios";
import { POST_MULTIPLE_FAILED, POST_MULTIPLE_REQUEST, POST_MULTIPLE_SUCCESS } from "./actionType";

export const postMultipleRequest = () => ({ type: POST_MULTIPLE_REQUEST });
export const postMultipleSuccess = () => ({
  type: POST_MULTIPLE_SUCCESS,
});
export const postMultipleFailed = () => ({ type: POST_MULTIPLE_FAILED });

export const PostMultiple = (formData) => (dispatch) => {
  dispatch(postMultipleRequest());

  return axios
    .post(`http://5.189.180.8:8010/header/multiple`, formData)
    .then((res) => {
      dispatch(postMultipleSuccess(res));
    })
    .catch((err) => {
      dispatch(postMultipleFailed(err));
    });
};
