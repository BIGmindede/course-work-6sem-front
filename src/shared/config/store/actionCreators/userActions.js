import UserService from "shared/config/http/userService"
import { banUserSuccess, fetchUsersError,
    fetchUsersLoading, fetchUsersSuccess, 
    setUserRoleSuccess, 
    unbanUserSuccess} from "../reducers/UserSlice"

export const getAllUsers = () => async (dispatch) => {
    dispatch(fetchUsersLoading())
    try {
        const { data } = await UserService.getAllUsers()
        dispatch(fetchUsersSuccess(data))
    } catch (error) {
        dispatch(fetchUsersError(error.message))
    }
}

export const setUserRole = (id, role) => async (dispatch) => {
    dispatch(fetchUsersLoading())
    try {
        await UserService.setUserRole(id, role)
        dispatch(setUserRoleSuccess({ id, role }))
    } catch (error) {
        dispatch(fetchUsersError(error.message))
    }
}

export const unbanUser = (id) => async (dispatch) => {
    dispatch(fetchUsersLoading())
    try {
        await UserService.unbanUser(id)
        dispatch(unbanUserSuccess(id))
    } catch (error) {
        dispatch(fetchUsersError(error.message))
    }
}

export const banUser = (id) => async (dispatch) => {
    dispatch(fetchUsersLoading())
    try {
        await UserService.banUser(id)
        dispatch(banUserSuccess(id))
    } catch (error) {
        dispatch(fetchUsersError(error.message))
    }
}
