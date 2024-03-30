import { useClassNames } from 'shared/lib/useClassNames'
import cls from './DialogWindow.module.scss'
import { Closer } from 'shared/UI/Closer/Closer'

export const DialogWindow = ({ className, children, closer }) => {
    return (
        <div className={useClassNames(cls.dialogwindow, [cls[className]])}>
            {children}
            {/* Исправить на нормальный крестик */}
            <Closer action={closer}/>
        </div>
    )
}