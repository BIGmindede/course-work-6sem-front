import { useClassNames } from 'shared/lib/useClassNames'
import cls from './LogoBox.module.scss'
import { Link } from 'react-router-dom'

export const LogoBox = ({ className }) => {
    return (
        <div className={useClassNames(cls.logobox, [cls[className]])}>
            <Link to='/'>Logo</Link>
        </div>
    )
}