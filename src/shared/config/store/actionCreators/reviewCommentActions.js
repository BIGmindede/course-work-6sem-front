import ReviewCommentService from "shared/config/http/reviewCommentService"
import {
    createReviewCommentSuccess,
    fetchReviewCommentsError,
    fetchReviewCommentsLoading,
    fetchReviewCommentsSuccess,
    removeReviewCommentSuccess
} from "../reducers/ReviewCommentSlice"

export const createReviewComment = (author, review, content) => async (dispatch) => {
    dispatch(fetchReviewCommentsLoading())
    try {
        const { data } = await ReviewCommentService.createReviewComment(author, review, content)
        dispatch(createReviewCommentSuccess(data))
    } catch (error) {
        dispatch(fetchReviewCommentsError(error.message))
    }
}

export const getAllReviewComments = (review) => async (dispatch) => {
    dispatch(fetchReviewCommentsLoading())
    try {
        const { data } = await ReviewCommentService.getAllReviewComments(review)
        dispatch(fetchReviewCommentsSuccess(data))
    } catch (error) {
        dispatch(fetchReviewCommentsError(error.message))
    }
}

export const removeReviewComment = (id) => async (dispatch) => {
    dispatch(fetchReviewCommentsLoading())
    try {
        if (await ReviewCommentService.removeReviewComment(id)) {
            dispatch(removeReviewCommentSuccess(id))
        }
    } catch (error) {
        dispatch(fetchReviewCommentsError(error.message))
    }
}