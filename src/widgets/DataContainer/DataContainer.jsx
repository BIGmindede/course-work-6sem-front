import { useClassNames } from 'shared/lib/useClassNames'
import cls from './DataContainer.module.scss'
import { List } from 'features/List/List'
import PlusIcon from 'shared/assets/icons/PlusIcon.svg?react'
import { useRef, useState } from 'react'

export const DataContainer = ({
    className,
    data,
    buttons,
    dataTransformer,
    redundant,
    listTheme,
    itemsOnClick,
    getTitleField,
    title,
    collapsable
}) => {

    const listRef = useRef()

    const [collapsed, setCollapsed] = useState(false)

    const handleToggleCollapse = () => {
        if (!collapsed) {
            const height = listRef.current.clientHeight
            listRef.current.style.marginTop = `-${height}px`
        }
        else {
            listRef.current.style.marginTop = '50px'
        }
    }

    return (
        <div className={
            useClassNames(
                cls.datacontainer,
                [
                    cls[className],
                    collapsable && cls.collapsable,
                    collapsed && cls.collapsed,
                    title && cls.titled
                ]
            )
        }>
            {title &&
                collapsable 
                    ? <button
                        className={cls.cap}
                        onClick={collapsable ? () => {
                            handleToggleCollapse()
                            setCollapsed(!collapsed)
                        } : null}
                    >
                        <h2>{title}</h2>
                        {collapsable && <PlusIcon/>}
                    </button>
                    : <div className={cls.cap}>
                        <h2>{title}</h2>
                    </div>
            }
            <List
                data={data}
                buttons={buttons}
                dataTransformer={dataTransformer}
                redundant={redundant}
                itemsOnClick={itemsOnClick}
                className={listTheme}
                getTitleField={getTitleField}
                ref={listRef}
            />
        </div>
    )
}