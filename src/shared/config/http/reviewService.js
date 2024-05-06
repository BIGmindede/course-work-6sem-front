import { getFiltersQuery } from "shared/lib/getFiltersQuery";
import api from ".";

export default class ReviewService {
    static async createReview(title, content, author, category, picture) {
        let formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        formData.append('author', author)
        formData.append('categoryName', category)
        formData.append('picture', picture)
        return api.post('/review', formData, {headers: { "Content-Type": "multipart/form-data" }})
    }

    static async getAllReviews() {
        return api.get('/review')
    }

    static async getFilteredReviews(filters) {
        const query = '/review?' + getFiltersQuery(filters)
        return api.get(query)
    }

    static async getUserReviews(userId) {
        return api.get(`/review/by_user/${userId}`)
    }

    static async getOne(id) {
        return api.get(`/review/${id}`)
    }

    static async removeReview(id) {
        return api.delete(`/review/${id}`)
    }
}