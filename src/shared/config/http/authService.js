import api from ".";

export default class AuthService {
    static async login(email, password) {
        return api.post('/auth/login', {email, password})
    }

    static async registration(email, password) {
        return api.post('/auth/registration', {email, password})
    }

    static async updateUserData(id, email, nickname, password) {
        return api.put(`/auth/update_user_data/${id}`, { email, nickname, password })
    }

    static async logout() {
        return api.post('/auth/logout')
    }

    static async refresh() {
        return api.get('/auth/refresh')
    }

    static async getUserData() {
        return api.get(`/auth`)
    }
}