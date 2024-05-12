import { useClassNames } from 'shared/lib/useClassNames'
import cls from './CommentsBox.module.scss'
import { Form } from 'entities/Form/Form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReviewComment, getAllReviewComments, removeReviewComment } from 'shared/config/store/actionCreators/reviewCommentActions'
import { selectReviewComments } from 'shared/config/store/reducers/ReviewCommentSlice'
import { selectUserData } from 'shared/config/store/reducers/AuthSlice'
import { Button, ButtonThemes } from 'shared/UI/Button/Button'
import { transformDate } from 'shared/lib/transformDate'
import { Loader } from 'shared/UI/Loader/Loader'

export const CommentsBox = ({ className, reviewId }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllReviewComments(reviewId))
    }, [])

    const reviewComments = useSelector(selectReviewComments)
    const userData = useSelector(selectUserData)

    return (
        <div className={useClassNames(cls.commentsbox, [cls[className]])}>
            <h2>Комментарии</h2>
            <Form
                fields={[
                    {
                        type: 'textarea',
                        placeholder: 'Ваш комментарий',
                        upperLabel: 'Ваш комментарий'
                    }
                ]}
                action={(content) => {dispatch(createReviewComment(userData.id, reviewId, content))}}
                buttonText="Опубликовать комментарий"
            />
            {reviewComments.reviewCommentList.length > 0 && <hr />}
            {!reviewComments.loading
                ? reviewComments.reviewCommentList.map(comment => 
                    <div className={cls.comment} key={comment.id}>
                        <h4>{comment.author.nickname ?? comment.author.email}</h4>
                        <p>{comment.content}</p>
                        <div className={cls.commentbuttons}>
                            {(comment.author.id === userData?.id ||
                            userData?.role === 'admin' ||
                            userData?.role === 'moderator') &&
                                <Button
                                    className={ButtonThemes.UNDERLINED}
                                    action={() => dispatch(removeReviewComment(comment.id))}
                                >Удалить</Button>
                            }
                        </div>
                        <div className={cls.date}>{transformDate(comment.date)}</div>
                    </div>
                )
                : <Loader/>
            }
        </div>
    )
}