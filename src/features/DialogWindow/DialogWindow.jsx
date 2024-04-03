import { useClassNames } from 'shared/lib/useClassNames'
import cls from './DialogWindow.module.scss'
import { Closer } from 'shared/UI/Closer/Closer'

export const DialogWindow = ({ className, children, closer, header }) => {
    return (
        <div className={useClassNames(cls.dialogwindow, [cls[className]])}>
            <div className={cls.cap}>
                <h3>{header}</h3>
                <Closer action={closer}/>
            </div>
            {children}
        </div>
    )
}