import api from ".";

export default class UserService {

    static async getAllUsers() {
        return api.get('/user')
    }

    static async getOneUser(id) {
        return api.get(`/user/${id}`)
    }
    
    static async setUserRole(id, role) {
        return api.put(`/user/setrole/${id}`, { role })
    }

    static async unbanUser(id) {
        return api.put(`/user/unban/${id}`)
    }

    static async banUser(id) {
        return api.put(`/user/ban/${id}`)
    }
}