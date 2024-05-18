import { useClassNames } from 'shared/lib/useClassNames'
import cls from './RateButtons.module.scss'
import { useEffect, useState } from 'react'
import ReviewRateService from 'shared/config/http/reviewRateService'
import LikeIcon from 'shared/assets/icons/LikeIcon.svg?react'
import LikeFilledIcon from 'shared/assets/icons/LikeFilledIcon.svg?react'
import DeclineLikeIcon from 'shared/assets/icons/DeclineLikeIcon.svg?react'
import { Button, ButtonThemes } from 'shared/UI/Button/Button'
import { DialogWindow } from 'features/DialogWindow/DialogWindow'

export const RateButtons = ({ className, userId, reviewData, setReviewData }) => {

    const [userRate, setUserRate] = useState({ value: 0 })

    const [dialogChosen, setDialogChosen] = useState(null)

    const [likes, setLikes] = useState([])

    const handleLikesMouseOver = (index) => {
        const currLikes = []
        for (let i = 0; i < 5; i++) {
            if (index >= i) currLikes.push(1)
            else currLikes.push(0)
        }
        setLikes(currLikes)
    }
    
    const handleMouseOut = () => {
        const currLikes = []
        for (let i = 0; i < 5; i++) {
            if (userRate.value - 1 >= i) currLikes.push(1)
            else currLikes.push(0)
        }
        setLikes(currLikes)
    }

    const handleRateOperation = async (method, ...args) => {
        const { data } = await method(...args)
        setReviewData(reviewData => ({
            ...reviewData,
            reliability: data.reliability,
            usersRatedAmount: data.usersRatedAmount
        }))
        setDialogChosen(null)
    }

    useEffect(() => {
        const fetchRate = async () => {
            try {
                const { data } = await ReviewRateService.getRateByUserAndReview(reviewData.id, userId)
                setUserRate(data ?? { value: null })
            } catch (error) {
                console.log(error)
            }
        }
        fetchRate()
    }, [reviewData, userId])

    useEffect(() => {
        const currLikes = []
        for (let i = 0; i < 5; i++) {
            if (userRate.value - 1 >= i) currLikes.push(1)
            else currLikes.push(0)
        }
        setLikes(currLikes)
    }, [userRate])

    return (
        <div className={useClassNames(cls.ratebuttons, [cls[className]])}>
            {userRate.value
                ? <div className={cls.btnsbound}>
                    <Button
                        className={ButtonThemes.WITH_ICON}
                        action={() => {setDialogChosen('upd')}}
                    >
                        <LikeFilledIcon/>
                        <span>Изменить</span>
                    </Button>
                    {dialogChosen === 'upd' &&
                        <DialogWindow
                            header="Изменить оценку"
                            closer={() => {setDialogChosen(null)}}
                        >
                            <div className={cls.likescontainer}>
                                {likes.map((like,index) =>
                                    <Button key={index}
                                        className={ButtonThemes.CLEAR}
                                        mouseOver={() => handleLikesMouseOver(index)}
                                        mouseOut={() => handleMouseOut()}
                                        action={() => handleRateOperation(
                                                ReviewRateService.updateUserRate,
                                                index + 1,
                                                userRate.id
                                        )}
                                    >
                                        {like > 0 ? <LikeFilledIcon/> : <LikeIcon/>}   
                                    </Button>
                                )}
                            </div>
                        </DialogWindow>
                    }
                    <Button 
                        className={ButtonThemes.WITH_ICON}
                        action={() => handleRateOperation(
                            ReviewRateService.removeUserRate,
                            userRate.id
                        )}
                    >
                        <DeclineLikeIcon/>
                        <span>Удалить</span>
                    </Button>
                </div>
                : <div className={cls.btnsbound}>
                    <Button 
                        className={ButtonThemes.WITH_ICON}
                        action={() => {setDialogChosen('add')}}
                    >
                        <LikeIcon/>
                        <span>Оценить</span>
                    </Button>
                    {dialogChosen === 'add' &&
                        <DialogWindow
                            header="Оценка отзыва"
                            closer={() => {setDialogChosen(null)}}
                        >
                            <div className={cls.likescontainer}>
                                {likes.map((like,index) =>
                                    <Button key={index}
                                        className={ButtonThemes.CLEAR}
                                        mouseOver={() => handleLikesMouseOver(index)}
                                        mouseOut={() => handleMouseOut()}
                                        action={() => handleRateOperation(
                                            ReviewRateService.createRate,
                                            reviewData.id,
                                            index + 1,
                                            userId
                                        )}
                                    >
                                        {like > 0 ? <LikeFilledIcon/> : <LikeIcon/>}   
                                    </Button>
                                )}
                            </div>
                        </DialogWindow>
                    }
                </div>
            }
        </div>
    )
}