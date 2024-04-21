
import ComplaintService from "shared/config/http/complaintService"
import {
    fetchComplaintsError, 
    fetchComplaintsLoading,
    fetchComplaintsSuccess, 
    removeComplaintSuccess,
    updateComplaintSuccess
} from "../reducers/ComplaintSlice"

export const createComplaint = (author, target, review, content) => async (dispatch) => {
    dispatch(fetchComplaintsLoading())
    try {
        await ComplaintService.createComplaint(author, target, review, content)
    } catch (error) {
        dispatch(fetchComplaintsError(error.message))
    }
}

export const updateComplaint = (id, status) => async (dispatch) => {
    dispatch(fetchComplaintsLoading())
    try {
        const { data } = await ComplaintService.updateComplaint(id, status)
        dispatch(updateComplaintSuccess(data))
    } catch (error) {
        dispatch(fetchComplaintsError(error.message))
    }
}

export const getAllComplaints = () => async (dispatch) => {
    dispatch(fetchComplaintsLoading())
    try {
        const { data } = await ComplaintService.getAllComplaints()
        dispatch(fetchComplaintsSuccess(data))
    } catch (error) {
        dispatch(fetchComplaintsError(error.message))
    }
}

export const getUserComplaints = (userId) => async (dispatch) => {
    dispatch(fetchComplaintsLoading())
    try {
        const { data } = await ComplaintService.getUserComplaints(userId)
        dispatch(fetchComplaintsSuccess(data))
    } catch (error) {
        dispatch(fetchComplaintsError(error.message))
    }
}

export const removeComplaint = (id) => async (dispatch) => {
    dispatch(fetchComplaintsLoading())
    try {
        if (await ComplaintService.removeComplaint(id)) {
            dispatch(removeComplaintSuccess(id))
        }
    } catch (error) {
        dispatch(fetchComplaintsError(error.message))
    }
}