import { useClassNames } from 'shared/lib/useClassNames'
import CancelIcon from 'shared/assets/CancelIcon.svg?react'
import cls from './DialogWindow.module.scss'

export const DialogWindow = ({ className, children, closer }) => {
    return (
        <div className={useClassNames(cls.dialogwindow, [cls[className]])}>
            {children}
            {/* Исправить на нормальный крестик */}
            <span onClick={closer} className={cls.closer}><CancelIcon/></span>
        </div>
    )
}