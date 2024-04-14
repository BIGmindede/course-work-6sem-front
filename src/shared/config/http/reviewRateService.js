import api from ".";

export default class ReviewRateService {
    static async createRate(review, value, author) {
        return api.post('/review_rate', {review, value, author})
    }

    static async getRateByUserAndReview(review, author) {
        return api.get(`/review_rate/${review}/${author}`)
    }

    static async updateUserRate(value, id) {
        return api.put(`/review_rate/${id}`, { value })
    }

    static async removeUserRate(id) {
        return api.delete(`/review_rate/${id}`)
    }
}