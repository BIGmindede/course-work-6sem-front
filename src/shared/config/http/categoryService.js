import api from ".";

export default class CategoryService {
    static async createCategory(title, picture, author, request) {
        let formData = new FormData()
        formData.append('title', title)
        formData.append('picture', picture)
        formData.append('author', author)
        formData.append('request', request)
        return api.post('/category', formData, {headers: { "Content-Type": "multipart/form-data" }})
    }

    static async getAllCategories() {
        return api.get('/category')
    }
    // Вероятно не нужно, если окажется нужно - верну
    // static async getOne(id) {
    //     return api.get(`/category/${id}`)
    // }

    static async updateCategory(id, title, picture) {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('title', title)
        formData.append('picture', picture)
        return api.put('/category', formData, {headers: { "Content-Type": "multipart/form-data" }})
    }

    static async removeCategory(id) {
        return api.delete(`/category/${id}`)
    }
}