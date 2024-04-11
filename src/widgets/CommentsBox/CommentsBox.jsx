import { useClassNames } from 'shared/lib/useClassNames'
import cls from './CommentsBox.module.scss'

export const CommentsBox = ({ className }) => {
    return (
        <div className={useClassNames(cls.commentsbox, [cls[className]])}>
            CommentsBox
        </div>
    )
}