import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import SidebarReducer from "./SidebarSlice";
import CategoryReducer from "./CategorySlice";

export const rootReducer = combineReducers({
    auth: AuthReducer,
    categories: CategoryReducer,
    sidebar: SidebarReducer
})
