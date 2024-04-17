import RequestService from "shared/config/http/requestService"
import { createRequestSuccess, fetchRequestsError,fetchRequestsLoading,
    fetchRequestsSuccess, removeRequestSuccess, updateRequestSuccess } 
    from "../reducers/RequestSlice"

export const createRequest = (title, content, author) => async (dispatch) => {
    dispatch(fetchRequestsLoading())
    try {
        const { data } = await RequestService.createRequest(title, content, author) 
        dispatch(createRequestSuccess(data))
    } catch (error) {
        dispatch(fetchRequestsError(error.message))
    }
}

export const updateRequest = (id, status) => async (dispatch) => {
    dispatch(fetchRequestsLoading())
    try {
        const { data } = await RequestService.updateRequest(id, status)
        dispatch(updateRequestSuccess(data))
    } catch (error) {
        dispatch(fetchRequestsError(error.message))
    }
}

export const getAllRequests = () => async (dispatch) => {
    dispatch(fetchRequestsLoading())
    try {
        const { data } = await RequestService.getAllRequests()
        dispatch(fetchRequestsSuccess(data))
    } catch (error) {
        dispatch(fetchRequestsError(error.message))
    }
}

export const getUserRequests = (userId) => async (dispatch) => {
    dispatch(fetchRequestsLoading())
    try {
        const { data } = await RequestService.getUserRequests(userId)
        dispatch(fetchRequestsSuccess(data))
    } catch (error) {
        dispatch(fetchRequestsError(error.message))
    }
}

export const removeRequest = (id) => async (dispatch) => {
    dispatch(fetchRequestsLoading())
    try {
        if (await RequestService.removeRequest(id)){
            dispatch(removeRequestSuccess(id))
        }
    } catch (error) {
        dispatch(fetchRequestsError(error.message))
    }
}