import Cookies from "universal-cookie"
import AuthService from "../../http/authService"
import { authError, authLoading, authSuccess } from "../reducers/AuthSlice"
import { jwtDecode } from "jwt-decode"


export const login = (email, password) => async (dispatch) => {
    dispatch(authLoading())
    try {
        const { data } = await AuthService.login(email, password)
        const cookies = new Cookies()
        cookies.set('token', data.accessToken, jwtDecode(data.accessToken).exp)
        dispatch(authSuccess(data))
    } catch (error) {
        dispatch(authError(error.message))
    }
}

export const registration = (email, password) => async (dispatch) => {
    dispatch(authLoading())
    try {
        const { data } = await AuthService.registration(email, password)
        const cookies = new Cookies()
        cookies.set('token', data.accessToken, jwtDecode(data.accessToken).exp)
        dispatch(authSuccess(data))
    } catch (error) {
        dispatch(authError(error.message))
    }
}

export const checkAuthority = () => async (dispatch) => {
    dispatch(authLoading())
    try {
        const { data } = await AuthService.refresh()
        const cookies = new Cookies()
        cookies.set('token', data.accessToken, jwtDecode(data.accessToken).exp)
        dispatch(authSuccess(data))
    } catch (error) {
        dispatch(authSuccess(null))
    }
}

export const getUserData = (id) => async (dispatch) => {
    dispatch(authLoading())
    try {
        const { data } = await AuthService.getUserData(id)
        dispatch(authSuccess(data))
    } catch (error) {
        dispatch(authError(error.message))
    }
}

export const updateUserData = (id, email, nickname, password) => async (dispatch) => {
    dispatch(authLoading())
    try {
        const { data } = await AuthService.updateUserData(id, email, nickname, password)
        dispatch(authSuccess(data))
    } catch (error) {
        dispatch(authSuccess(null))
    }
}

export const logout = () => async (dispatch) => {
    dispatch(authLoading())
    try {
        await AuthService.logout()
        const cookies = new Cookies()
        cookies.remove('token')
        dispatch(authSuccess(null))
    } catch (error) {
        dispatch(authError(error.message))
    }
}
