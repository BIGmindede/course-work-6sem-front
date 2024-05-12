import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'requestSlice',
    initialState: {
        loading: false,
        requestsList: [],
        error: null
    },
    reducers: {
        fetchRequestsLoading: (state) => {
            state.loading = true
            state.error = null
        },
        fetchRequestsSuccess: (state, action) => {
            state.loading = false
            state.requestsList = action.payload
        },
        createRequestSuccess: (state, action) => {
            state.loading = false
            state.requestsList = [...state.requestsList, action.payload]
        },
        updateRequestSuccess: (state, action) => {
            state.loading = false
            state.requestsList = state.requestsList
                .map(request => request.id === action.payload.id ? action.payload : request)
        },
        removeRequestSuccess: (state, action) => {
            state.loading = false
            state.requestsList = state.requestsList.filter(request => request.id !== action.payload)
        },
        fetchRequestsError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    fetchRequestsLoading,
    fetchRequestsSuccess,
    createRequestSuccess,
    updateRequestSuccess,
    removeRequestSuccess,
    fetchRequestsError
} = requestSlice.actions

export const selectRequests = (state) => state.requests

export default requestSlice.reducer