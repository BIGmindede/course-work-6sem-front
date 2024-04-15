import PlusIcon from 'shared/assets/icons/PlusIcon.svg?react'
import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Closer.module.scss'

export const Closer = ({ className, action }) => {
    return (
        <span 
            onClick={action}
            className={useClassNames(cls.closer, [cls[className]])}
        >
            <PlusIcon className={cls.closericon}/>
        </span>
    )
}