import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useClassNames } from 'shared/lib/useClassNames'
import cls from './ReviewBox.module.scss'
import ReviewService from 'shared/config/http/reviewService'
import { Img } from 'shared/UI/Img/Img'
import { transformDate } from 'shared/lib/transformDate'

export const ReviewBox = ({ className }) => {
    
    const [reviewData, setReviewData] = useState(null)

    const location = useLocation()

    useEffect(() => {
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
        <div className={useClassNames(cls.reviewbox, [cls[className]])}>
            <Img imageId={reviewData?.pictureName}/>
            <div className={cls.data}>
                <h2>{reviewData?.title}</h2>
                <div className={cls.info}>
                    <span>Категория: {reviewData?.category}</span>
                    <span>Автор: {reviewData?.author?.nickname ?? reviewData?.author?.email}</span>
                    <span>Рейтинг отзыва: {reviewData?.reliability} ({reviewData?.usersRatedAmount})</span>
                    <span>Дата публикации: {transformDate(reviewData?.date)}</span>
                </div>
                    
                <hr />
                <h3>Содержание</h3>
                <p>{reviewData?.content}</p>
            </div>
        </div>
    )
}