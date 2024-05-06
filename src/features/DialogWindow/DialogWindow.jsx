import { useClassNames } from 'shared/lib/useClassNames'
import cls from './DialogWindow.module.scss'
import { Closer } from 'shared/UI/Closer/Closer'

export const DialogWindow = ({ className, children, closer, header }) => {
    return (
        <div className={useClassNames(!className && cls.dialogwindow, [cls[className]])}>
            <div className={cls.cap}>
                <h3>{header}</h3>
                {closer &&
                    <Closer action={closer}/>
                }
            </div>
            {children}
        </div>
    )
}