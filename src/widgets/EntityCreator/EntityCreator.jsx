import { useClassNames } from 'shared/lib/useClassNames'
import cls from './EntityCreator.module.scss'

export const EntityCreator = ({ className, children }) => {
    return (
        <div className={useClassNames(cls.entitycreator, [cls[className]])}>
            {children}
        </div>
    )
}