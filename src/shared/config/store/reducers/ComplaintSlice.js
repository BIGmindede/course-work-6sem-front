import { createSlice } from "@reduxjs/toolkit";

const complaintSlice = createSlice({
    name: 'complaintSlice',
    initialState: {
        loading: false,
        complaintsList: [],
        error: null
    },
    reducers: {
        fetchComplaintsLoading: (state) => {
            state.loading = true
            state.error = null
        },
        fetchComplaintsSuccess: (state, action) => {
            state.loading = false
            state.complaintsList = action.payload
        },
        createComplaintSuccess: (state, action) => {
            state.loading = false
            state.complaintsList = [...state.complaintsList, action.payload]
        },
        updateComplaintSuccess: (state, action) => {
            state.loading = false
            state.complaintsList = state.complaintsList
                .map(request => request.id === action.payload.id ? action.payload : request)
        },
        removeComplaintSuccess: (state, action) => {
            state.loading = false
            state.complaintsList = state.complaintsList.filter(request => request.id !== action.payload)
        },
        fetchComplaintsError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    fetchComplaintsLoading,
    fetchComplaintsSuccess,
    createComplaintSuccess,
    updateComplaintSuccess,
    removeComplaintSuccess,
    fetchComplaintsError
} = complaintSlice.actions

export const selectComplaints = (state) => state.complaints

export default complaintSlice.reducer