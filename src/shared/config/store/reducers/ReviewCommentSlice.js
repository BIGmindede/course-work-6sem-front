import { createSlice } from "@reduxjs/toolkit";

const reviewCommentSlice = createSlice({
    name: 'reviewCommentSlice',
    initialState: {
        loading: false,
        reviewCommentList: [],
        error: null
    },
    reducers: {
        fetchReviewCommentsLoading: (state) => {
            state.loading = true
            state.error = null
        },
        fetchReviewCommentsSuccess: (state, action) => {
            state.loading = false
            state.reviewCommentList = action.payload
        },
        createReviewCommentSuccess: (state, action) => {
            state.loading = false
            state.reviewCommentList = [action.payload, ...state.reviewCommentList]
        },
        removeReviewCommentSuccess: (state, action) => {
            state.loading = false
            state.reviewCommentList = state.reviewCommentList.filter(request => request.id !== action.payload)
        },
        fetchReviewCommentsError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    fetchReviewCommentsLoading,
    fetchReviewCommentsSuccess,
    createReviewCommentSuccess,
    removeReviewCommentSuccess,
    fetchReviewCommentsError
} = reviewCommentSlice.actions

export const selectReviewComments = (state) => state.reviewComments

export default reviewCommentSlice.reducer