import { useLocation } from "react-router-dom"
import { CommentsBox } from "widgets/CommentsBox/CommentsBox"
import { ReviewBox } from "widgets/ReviewBox/ReviewBox"

export default () => {
    const location = useLocation()
    const reviewId = location.pathname
        .split('/')
        .filter(segment => segment !== '')
        .pop()
    return (
        <div>
            <ReviewBox reviewId={reviewId}/>
            <CommentsBox reviewId={reviewId}/>
        </div>
    )
}