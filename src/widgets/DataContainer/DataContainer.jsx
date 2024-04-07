import { useClassNames } from 'shared/lib/useClassNames'
import cls from './DataContainer.module.scss'
import { List } from 'features/List/List'

export const DataContainer = ({
    className,
    data,
    buttons,
    dataTransformer,
    redundant,
    listTheme,
    itemsOnClick,
    getTitleField,
    title
}) => {

    return (
        <div className={useClassNames(cls.datacontainer, [cls[className]])}>
            {title && 
                <h2>{title}</h2>
            }
            <List
                data={data}
                buttons={buttons}
                dataTransformer={dataTransformer}
                redundant={redundant}
                itemsOnClick={itemsOnClick}
                className={listTheme}
                getTitleField={getTitleField}
            />
        </div>
    )
}