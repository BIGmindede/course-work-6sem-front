import { useClassNames } from 'shared/lib/useClassNames'
import cls from './List.module.scss'
import { ListItem, listItemThemes } from 'entities/ListItem/ListItem'

export const List = ({
    className,
    data,
    buttons,
    dataTransformer,
    redundant,
    itemsOnClick,
    getTitleField
}) => {
    return (
        <div className={useClassNames(cls.list, [cls[className ?? listItemThemes.STROKE]])}>
            {data.map((listItem) =>
                <ListItem
                    key={listItem.id}
                    itemData={listItem}
                    buttons={buttons}
                    dataTransformer={dataTransformer}
                    redundant={redundant}
                    className={className}
                    onClick={itemsOnClick}
                    getTitleField={getTitleField}
                />)}
        </div>
    )
}