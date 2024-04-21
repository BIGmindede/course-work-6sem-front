import api from ".";

export default class ReviewCommentService {
    static async createReviewComment(author, review, content) {
        return api.post('/review_comment', { author, review, content })
    }

    static async getAllReviewComments(review) {
        return api.get(`/review_comment/${review}`)
    }

    static async removeReviewComment(id) {
        return api.delete(`/review_comment/${id}`)
    }
}