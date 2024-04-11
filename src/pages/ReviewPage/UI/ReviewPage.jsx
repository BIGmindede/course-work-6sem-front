import { useEffect } from "react"
import { checkAuthority } from "shared/config/store/actionCreators/authActions"
import { CommentsBox } from "widgets/CommentsBox/CommentsBox"
import { ReviewBox } from "widgets/ReviewBox/ReviewBox"

export default () => {
    
    useEffect(() => {
        dispatch(checkAuthority())
    }, [])

    return (
        <div>
            <ReviewBox/>
            <CommentsBox/>
        </div>
    )
}