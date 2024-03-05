import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";

export const rootReducer = combineReducers({
    auth: AuthReducer
})
