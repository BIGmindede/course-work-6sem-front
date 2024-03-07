import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Options.module.scss'
import { Button, ButtonThemes } from 'shared/UI/Button/Button'

export const Options = ({ className }) => {
    return (
        <div className={useClassNames(cls.options, [cls[className]])}>
            <Button className={ButtonThemes.ROUND}>theme</Button>
        </div>
    )
}