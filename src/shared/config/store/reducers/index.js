import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import SidebarReducer from "./SidebarSlice";
import CategoryReducer from "./CategorySlice";
import ReviewReducer from "./ReviewSlice";

export const rootReducer = combineReducers({
    auth: AuthReducer,
    categories: CategoryReducer,
    reviews: ReviewReducer,
    sidebar: SidebarReducer
})
