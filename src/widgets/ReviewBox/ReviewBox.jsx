import { useEffect, useState } from 'react'
import { useClassNames } from 'shared/lib/useClassNames'
import cls from './ReviewBox.module.scss'
import LikeFilledIcon from 'shared/assets/icons/LikeFilledIcon.svg?react'
import { Img } from 'shared/UI/Img/Img'
import { transformDate } from 'shared/lib/transformDate'
import { RateButtons } from 'features/RateButtons/RateButtons'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserData } from 'shared/config/store/reducers/AuthSlice'
import { Button, ButtonThemes } from 'shared/UI/Button/Button'
import { Modal } from 'widgets/Modal'
import { Form } from 'entities/Form/Form'
import { createComplaint } from 'shared/config/store/actionCreators/complaintActions'
import ReviewService from 'shared/config/http/reviewService'
import { Loader } from 'shared/UI/Loader/Loader'

export const ReviewBox = ({ className, reviewId }) => {
    
    const [complaintModalActive, setComplaintModalActive] = useState(false)

    const dispatch = useDispatch()

    const [reviewData, setReviewData] = useState(null)

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const { data } = await ReviewService.getOne(reviewId)
                setReviewData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchReview()
    }, [])
    
    const userData = useSelector(selectUserData)

    return (
        <div className={useClassNames(cls.reviewbox, [cls[className]])}>
            {reviewData
                ? <>
                    {complaintModalActive &&
                        <Modal
                            header={`Жалоба на отзыв "${reviewData.title}"`}
                            closer={() => {setComplaintModalActive(false)}}
                        >
                            <Form
                                fields={[
                                    {
                                        type: 'textarea',
                                        placeholder: 'Опишите причины жалобы',
                                        upperLabel: 'Содержание жалобы'
                                    }
                                ]}
                                action={(content) => {
                                    setComplaintModalActive(false)
                                    return dispatch(createComplaint(userData.id, reviewData.author.id, reviewData.id, content))
                                }}
                                buttonText="Оправить жалобу"
                            />
                        </Modal>
                    }
                    <Img className={cls.reviewimg} imageId={reviewData?.pictureName}/>
                    <div className={cls.data}>
                        <h2 className={cls.title}>
                            {reviewData.title}
                            
                        </h2>
                        <Button
                            className={ButtonThemes.UNDERLINED}
                            action={() => {setComplaintModalActive(true)}}
                        >
                            Пожаловаться
                        </Button>
                        <div className={cls.info}>
                            <span>
                                <span>Категория: </span>
                                <span>{reviewData.category}</span>
                            </span>
                            <span>
                                <span>Автор: </span>
                                <span>{reviewData.author.nickname ?? reviewData.author.email}</span>
                            </span>
                            <span className={cls.rate}>
                                <span>Рейтинг отзыва:</span>
                                <span>
                                    <span>{reviewData.reliability}</span>
                                    <span><LikeFilledIcon/></span>
                                    <span>({reviewData?.usersRatedAmount})</span>
                                </span>
                            </span>
                            {userData && <RateButtons 
                                userId={userData.id}
                                reviewData={reviewData}
                                setReviewData={setReviewData}
                            />}
                            <span>
                                <span>Дата публикации:</span>
                                <span>{transformDate(reviewData.date)}</span>
                            </span>
                        </div>
                        <hr />
                        <h3>Содержание</h3>
                        <p>{reviewData.content}</p>
                    </div>
                </>
                : <Loader/>
            }
        </div>
    )
}