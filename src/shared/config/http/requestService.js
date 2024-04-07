import api from ".";

export default class RequestService {
    static async createRequest(title, content, author) {
        return api.post('/request', { title, content, author })
    }

    static async getAllRequests() {
        return api.get('/request')
    }

    static async getUserRequests(userId) {
        return api.get(`/request/by_user/${userId}`)
    }
    // Вероятно не нужно, если окажется нужно - верну
    // static async getOneRequest(id) {
    //     return api.get(`/request/${id}`)
    // }

    static async updateRequest(id, status) {
        return api.put(`/request/${id}`, { status })
    }

    static async removeRequest(id) {
        return api.delete(`/request/${id}`)
    }
}