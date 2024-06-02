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
        
        setUserRoleSuccess: (state, action) => {
            state.loading = false
            state.usersList = state.usersList
                .map(user => user.id === action.payload.id
                    ? { ...user, role: action.payload.role }
                    : user)
        },
        unbanUserSuccess: (state, action) => {
            state.loading = false
            state.usersList = state.usersList
                .map(user => user.id === action.payload
                    ? { ...user, isActivated: true }
                    : user)
        },
        banUserSuccess: (state, action) => {
            state.loading = false
            state.usersList = state.usersList
                .map(user => user.id === action.payload
                    ? { ...user, isActivated: false }
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
    setUserRoleSuccess,
    unbanUserSuccess,
    banUserSuccess,
    fetchUsersError
} = userSlice.actions

export const selectUsers = (state) => state.users

export default userSlice.reducer