import UserService from "shared/config/http/userService"
import { banUserSuccess, fetchUsersError,
    fetchUsersLoading, fetchUsersSuccess } from "../reducers/UserSlice"

export const getAllUsers = () => async (dispatch) => {
    dispatch(fetchUsersLoading())
    try {
        const { data } = await UserService.getAllUsers()
        dispatch(fetchUsersSuccess(data))
    } catch (error) {
        dispatch(fetchUsersError(error.message))
    }
}

export const banUser = (id) => async (dispatch) => {
    dispatch(fetchUsersLoading())
    try {
        const { data } = await UserService.banUser(id)
        dispatch(banUserSuccess(data))
    } catch (error) {
        dispatch(fetchUsersError(error.message))
    }
}
