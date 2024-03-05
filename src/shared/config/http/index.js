import axios from "axios";
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

export default api