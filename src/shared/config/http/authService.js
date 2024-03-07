import api from ".";

export default class AuthService {
    static async login(email, password) {
        return api.post('/auth/login', {email, password})
    }

    static async registration(email, password) {
        return api.post('/auth/registration', {email, password})
    }

    static async logout() {
        return api.post('/auth/logout')
    }

    static async refresh() {
        return api.get('/auth/refresh')
    }
}