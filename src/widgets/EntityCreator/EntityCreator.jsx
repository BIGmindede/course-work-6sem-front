import { useClassNames } from 'shared/lib/useClassNames'
import cls from './EntityCreator.module.scss'

export const EntityCreator = ({ className, children, title }) => {
    return (
        <div className={useClassNames(cls.entitycreator, [cls[className]])}>
            <h3>{title}</h3>
            {children}
        </div>
    )
}