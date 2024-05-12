import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        loading: false,
        usersList: [],
        error: null
    },
    reducers: {
        fetchUsersLoading: (state) => {
            state.loading = true
            state.error = null
        },
        fetchUsersSuccess: (state, action) => {
            state.loading = false
            state.usersList = action.payload
        },
        banUserSuccess: (state, action) => {
            state.loading = false
            state.usersList = state.usersList
                .map(user => user.id === action.payload.id 
                    ? action.payload
                    : user)
        },
        fetchUsersError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    fetchUsersLoading,
    fetchUsersSuccess,
    banUserSuccess,
    fetchUsersError
} = userSlice.actions

export const selectUsers = (state) => state.users

export default userSlice.reducer