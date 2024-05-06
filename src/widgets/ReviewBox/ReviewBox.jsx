import { useState } from 'react'
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

export const ReviewBox = ({ className, reviewData, setReviewData }) => {
    
    const [complaintModalActive, setComplaintModalActive] = useState(false)

    const dispatch = useDispatch()

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
                            <span>Категория: {reviewData.category}</span>
                            <span>Автор: {reviewData.author.nickname ?? reviewData.author.email}</span>
                            <div className={cls.rate}>
                                <span className={cls.ratetitle}>
                                    Рейтинг отзыва: {reviewData.reliability}
                                    <LikeFilledIcon/>
                                    ({reviewData?.usersRatedAmount})
                                </span>
                                {userData && <RateButtons 
                                    userId={userData.id}
                                    reviewData={reviewData}
                                    setReviewData={setReviewData}
                                />}
                            </div>
                            <span>Дата публикации: {transformDate(reviewData.date)}</span>
                        </div>
                            
                        <hr />
                        <h3>Содержание</h3>
                        <p>{reviewData.content}</p>
                    </div>
                    
                </>
                : <></>
            }
        </div>
    )
}