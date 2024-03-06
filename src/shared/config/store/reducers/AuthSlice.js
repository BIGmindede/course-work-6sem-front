import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        loading: false,
        userData: null,
        error: null
    },
    reducers: {
        authLoading(state) {
            state.loading = true
            state.error = null
        }, 
        authSuccess(state, action) {
            state.loading = false
            state.userData = action.payload
        },
        authError(state, action) {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const {
    authLoading,
    authSuccess,
    authError
} = authSlice.actions

export const selectUserData = (state) => state.auth.userData

export default authSlice.reducer