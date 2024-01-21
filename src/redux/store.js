import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as detailReducer } from "./Details/reducer";
import { thunk } from "redux-thunk";
const root = combineReducers({ detailReducer });
export const store = legacy_createStore(root, applyMiddleware(thunk));
