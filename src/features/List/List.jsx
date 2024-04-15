import { useClassNames } from 'shared/lib/useClassNames'
import cls from './List.module.scss'
import { ListItem, listItemThemes } from 'entities/ListItem/ListItem'
import { forwardRef } from 'react'

export const List = forwardRef(({
    className,
    data,
    buttons,
    dataTransformer,
    redundant,
    itemsOnClick,
    getTitleField,
}, ref) => {
    return (
        <div ref={ref} className={useClassNames(cls.list, [cls[className ?? listItemThemes.STROKE]])}>
            {data.length > 0
                ? data.map((listItem) =>
                    <ListItem
                        key={listItem.id}
                        itemData={listItem}
                        buttons={buttons}
                        dataTransformer={dataTransformer}
                        redundant={redundant}
                        className={className}
                        onClick={itemsOnClick}
                        getTitleField={getTitleField}
                    />
                )
                : <div className={cls.emptyplaceholder}>Пусто</div>
            }
        </div>
    )
})