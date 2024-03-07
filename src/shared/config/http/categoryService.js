import api from ".";

export default class CategoryService {
    static async create(title, author, request) {
        return api.post('/category', {title, author, request})
    }

    static async getAll() {
        return api.get('/category')
    }
    // Вероятно не нужно, если окажется нужно - верну
    // static async getOne(id) {
    //     return api.get(`/category/${id}`)
    // }

    static async remove(id) {
        return api.delete(`/category/${id}`)
    }
}