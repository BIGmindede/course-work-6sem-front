import { useClassNames } from 'shared/lib/useClassNames'
import cls from './SearchBox.module.scss'
import { Button } from 'shared/UI/Button/Button'
import { ButtonThemes } from 'shared/UI/Button/Button'

export const SearchBox = ({ className }) => {
    return (
        <form className={useClassNames(cls.searchbox, [cls[className]])}>
            <Button className={ButtonThemes.ALFA}>Фильтры</Button>
            <input type="text" />
        </form>
    )
}