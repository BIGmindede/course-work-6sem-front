import { useClassNames } from 'shared/lib/useClassNames'
import cls from './DataContainer.module.scss'
import { List } from 'features/List/List'
import PlusIcon from 'shared/assets/icons/PlusIcon.svg?react'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from 'shared/UI/Loader/Loader'

export const DataContainer = ({
    dataSelector,
    className,
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

    const { selectorFn, dataKey } = dataSelector
    const { [dataKey]: dataList , loading } = useSelector(selectorFn)

    const handleToggleCollapse = () => {
        if (!collapsed) {
            const height = listRef.current.clientHeight
            listRef.current.style.marginTop = `calc(-${height}px - clamp(35px, 5vw, 50px))`
        }
        else {
            listRef.current.style.marginTop = '0'
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
            {loading 
                ? <Loader/>
                : <List
                    data={dataList}
                    buttons={buttons}
                    dataTransformer={dataTransformer}
                    redundant={redundant}
                    itemsOnClick={itemsOnClick}
                    className={listTheme}
                    getTitleField={getTitleField}
                    ref={listRef}
                />
            }
        </div>
    )
}