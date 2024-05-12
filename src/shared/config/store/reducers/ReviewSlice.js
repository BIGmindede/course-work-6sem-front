import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState: {
        loading: false,
        reviewsList: [],
        error: null
    },
    reducers: {
        fetchReviewsLoading: (state) => {
            state.loading = true
            state.error = null
        },
        fetchReviewsSuccess: (state, action) => {
            state.loading = false
            state.reviewsList = action.payload
        },
        createReviewSuccess: (state, action) => {
            state.loading = false
            state.reviewsList = [action.payload, ...state.reviewsList]
        },
        updateReviewSuccess: (state, action) => {
            state.loading = false
            state.reviewsList = state.reviewsList
                .map(review => review.id === action.payload.id ? action.payload : review)
        },
        removeReviewSuccess: (state, action) => {
            state.loading = false
            state.reviewsList = state.reviewsList.filter(review => review.id !== action.payload)
        },
        fetchReviewsError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    fetchReviewsLoading,
    fetchReviewsSuccess,
    createReviewSuccess,
    updateReviewSuccess,
    removeReviewSuccess,
    fetchReviewsError
} = reviewSlice.actions

export const selectReviews = (state) => state.reviews

export default reviewSlice.reducer