import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Header.module.scss'

export const Header = ({ className }) => {
    return (
        <div className={useClassNames(cls.header, [className])}>
            
        </div>
    )
}