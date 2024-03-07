import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import SidebarReducer from "./SidebarSlice";

export const rootReducer = combineReducers({
    auth: AuthReducer,
    sidebar: SidebarReducer
})
