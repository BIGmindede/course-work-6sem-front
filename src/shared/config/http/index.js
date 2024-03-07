import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

export const API_URL = 'http://localhost:5000/api'

const cookies = new Cookies()

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${cookies.get('token')}`
    return config
})

api.interceptors.response.use(config => {
    return config
}, async error => {
    if (error.response.status == 401) {
        const originalRequest = error.config
        try {
            const { data } = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
            cookies.set('token', data.accessToken, jwtDecode(data.accessToken).exp)
            return api.request(originalRequest)
        } catch (error) {
            console.log(error.message)
        }
           
    }
})

export default api