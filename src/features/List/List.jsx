import { useClassNames } from 'shared/lib/useClassNames'
import cls from './List.module.scss'
import { ListItem } from 'entities/ListItem/ListItem'

export const List = ({ className, data, buttons, dataTransformer }) => {
    return (
        <div className={useClassNames(cls.list, [cls[className]])}>
            {data.map((listItem, index) =>
                <ListItem
                    key={listItem._id}
                    itemData={{ index: index+1 , ...listItem }}
                    buttons={buttons}
                    dataTransformer={dataTransformer}
                />)}
        </div>
    )
}