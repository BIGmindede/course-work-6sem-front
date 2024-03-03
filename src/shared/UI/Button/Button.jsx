import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Button.module.scss'
import { useSelector } from 'react-redux'

export const ButtonThemes = {
    BASIC: 'basic',
    AGREEMENT: 'agreement',
    WARNING: 'warning',
}

export const Button = ({ className, children, action }) => {

    return (
        <button onClick={action} disabled={useSelector(state => state)} className={useClassNames(cls.button, [className])}>
            {children}
        </button>
    )
}