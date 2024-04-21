import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import SidebarReducer from "./SidebarSlice";
import CategoryReducer from "./CategorySlice";
import ReviewReducer from "./ReviewSlice";
import UserReducer from "./UserSlice";
import RequestReducer from "./RequestSlice";
import ComplaintReducer from "./ComplaintSlice";
import ReviewCommentReducer from "./ReviewCommentSlice";

export const rootReducer = combineReducers({
    auth: AuthReducer,
    categories: CategoryReducer,
    reviews: ReviewReducer,
    users: UserReducer,
    requests: RequestReducer,
    complaints: ComplaintReducer,
    reviewComments: ReviewCommentReducer,
    sidebar: SidebarReducer
})
