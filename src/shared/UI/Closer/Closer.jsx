import CancelIcon from 'shared/assets/CancelIcon.svg?react'
import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Closer.module.scss'

export const Closer = ({ className, action }) => {
    return (
        <span 
            onClick={action}
            className={useClassNames(cls.closer, [cls[className]])}
        >
            <CancelIcon className={cls.closericon}/>
        </span>
    )
}