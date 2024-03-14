import { useClassNames } from 'shared/lib/useClassNames'
import cls from './List.module.scss'
import { ListItem } from 'entities/ListItem/ListItem'

export const List = ({ className, data, buttons, dataTransformer }) => {
    return (
        <div className={useClassNames(cls.list, [cls[className]])}>
            {data.map((listItem) =>
                <ListItem
                    key={listItem.id}
                    itemData={listItem}
                    buttons={buttons}
                    dataTransformer={dataTransformer}
                />)}
        </div>
    )
}