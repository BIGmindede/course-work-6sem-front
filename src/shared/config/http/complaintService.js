import api from ".";

export default class ComplaintService {
    static async createComplaint(author, target, review, content) {
        return api.post('/complaint', { author, target, review, content })
    }

    static async getAllComplaints() {
        return api.get('/complaint')
    }

    static async getUserComplaints(userId) {
        return api.get(`/complaint/${userId}`)
    }
    // Вероятно не нужно, если окажется нужно - верну
    // static async getOneRequest(id) {
    //     return api.get(`/request/${id}`)
    // }

    static async updateComplaint(id, status) {
        return api.put(`/complaint/${id}`, { status })
    }

    static async removeComplaint(id) {
        return api.delete(`/complaint/${id}`)
    }
}