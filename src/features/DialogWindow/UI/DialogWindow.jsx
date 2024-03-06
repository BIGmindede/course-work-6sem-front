import { useClassNames } from 'shared/lib/useClassNames'
import cls from './DialogWindow.module.scss'

export default ({ className, children, closer }) => {
    return (
        <div className={useClassNames(cls.dialogwindow, [cls[className]])}>
            {children}
            {/* Исправить на нормальный крестик */}
            <span onClick={closer}>Х</span>
        </div>
    )
}