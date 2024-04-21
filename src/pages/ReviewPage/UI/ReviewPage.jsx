import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import ReviewService from "shared/config/http/reviewService"
import { checkAuthority } from "shared/config/store/actionCreators/authActions"
import { CommentsBox } from "widgets/CommentsBox/CommentsBox"
import { ReviewBox } from "widgets/ReviewBox/ReviewBox"

export default () => {
    
    const dispatch = useDispatch()
    const location = useLocation()

    const [reviewData, setReviewData] = useState(null)

    useEffect(() => {
        dispatch(checkAuthority())
        const fetchReview = async () => {
            try {
                const id = location.pathname
                    .split('/')
                    .filter(segment => segment !== '')
                    .pop()
                const { data } = await ReviewService.getOne(id)
                setReviewData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchReview()
    }, [])

    return (
        <div>
            <ReviewBox reviewData={reviewData} setReviewData={setReviewData}/>
            <CommentsBox reviewData={reviewData}/>
        </div>
    )
}