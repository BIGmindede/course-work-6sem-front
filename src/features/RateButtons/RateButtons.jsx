import { useClassNames } from 'shared/lib/useClassNames'
import cls from './RateButtons.module.scss'

export const RateButtons = ({ className }) => {

    

    return (
        <div className={useClassNames(cls.ratebuttons, [cls[className]])}>

        </div>
    )
}