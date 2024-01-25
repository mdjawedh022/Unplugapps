import axios from "axios";
import {
  POST_HEADER_FAILED,
  POST_HEADER_SUCCESS,
  POST_HEADER_REQUEST,
} from "./actionType";

export const postHeadRequest = () => ({ type: POST_HEADER_REQUEST });
export const postHeadSuccess = () => ({
  type: POST_HEADER_SUCCESS,
});
export const postHeadFailed = () => ({ type: POST_HEADER_FAILED });

export const HeaderDataPost = (formData) => (dispatch) => {
  dispatch(postHeadRequest());

  return axios
    .post(`http://5.189.180.8:8010/header`, formData)
    .then((res) => {
      dispatch(postHeadSuccess(res));
    })
    .catch((err) => {
      dispatch(postHeadFailed(err));
    });
};
// export const HeaderDataPost = (formData) => async(dispatch) => {
//   dispatch(postHeadRequest());
// try{
//    const res=await axios.post(`http://5.189.180.8:8010/header`, formData)
//    dispatch(postHeadSuccess(res))
//    console.log(res);
// }catch(err){
//   dispatch(postHeadFailed(err))
// }
// };
