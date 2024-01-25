import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as detailReducer } from "./Details/reducer";
import {reducer as headerReducer} from "./Header/reducer"
import {reducer as itemReducer} from "./New/reducer";
import {reducer as multipleReducer} from "./Insert/reducer";
import { thunk } from "redux-thunk";
const root = combineReducers({
  detailReducer,
  headerReducer,
  itemReducer,
  multipleReducer,
});
export const store = legacy_createStore(root, applyMiddleware(thunk));
