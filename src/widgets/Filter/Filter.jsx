import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Filter.module.scss'

export const Filter = ({ className }) => {
    return (
        <div className={useClassNames(cls.filter, [cls[className]])}>
            
        </div>
    )
}