import ReviewService from "shared/config/http/reviewService"
import { createReviewSuccess, fetchReviewsError,fetchReviewsLoading,
    fetchReviewsSuccess, removeReviewSuccess, updateReviewSuccess } 
    from "../reducers/ReviewSlice"

export const createReview = (title, content, author, category, picture) => async (dispatch) => {
    dispatch(fetchReviewsLoading())
    try {
        const { data } = await ReviewService.createReview(title, content, author, category, picture) 
        console.log(data)
        dispatch(createReviewSuccess(data))
    } catch (error) {
        dispatch(fetchReviewsError(error.message))
    }
}

export const updateReview = (rate) => async (dispatch) => {
    dispatch(fetchReviewsLoading())
    try {
        const { data } = await ReviewService.updateReview(rate)
        dispatch(updateReviewSuccess(data))
    } catch (error) {
        dispatch(fetchReviewsError(error.message))
    }
}

export const getAllReviews = () => async (dispatch) => {
    dispatch(fetchReviewsLoading())
    try {
        const { data } = await ReviewService.getAllReviews()
        dispatch(fetchReviewsSuccess(data))
    } catch (error) {
        dispatch(fetchReviewsError(error.message))
    }
}

export const removeReview = (id) => async (dispatch) => {
    dispatch(fetchReviewsLoading())
    try {
        await ReviewService.removeReview(id)
        dispatch(removeReviewSuccess(id))
    } catch (error) {
        dispatch(fetchReviewsError(error.message))
    }
}