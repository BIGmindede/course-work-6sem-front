import { useClassNames } from 'shared/lib/useClassNames'
import cls from './ListItem.module.scss'
import { Button, ButtonThemes } from 'shared/UI/Button/Button'
import { transformDate } from 'shared/lib/transformDate'
import { truncate } from 'shared/lib/truncate'
import { Img } from 'shared/UI/Img/Img'

export const listItemThemes = {
    SQUARE: 'square',
    STROKE: 'stroke'
}

export const listItemElementsClasses = {
    TITLE: 'title',
    AUTHOR: 'author',
    CONTENT: 'content',
    RATE: 'rate'
}

export const ListItem = ({
    className,
    itemData,
    buttons,
    dataTransformer,
    redundant,
    onClick,
    getTitleField,
    children
}) => {

    const content = dataTransformer(itemData)

    return (
        <div 
            className={useClassNames(
                    cls.listitem,
                    [cls[className ?? listItemThemes.STROKE],
                    itemData.date && !redundant && cls.dated]
            )}
            onClick={(e) => 
                (e.target.tagName !== "BUTTON" && onClick) && onClick(itemData)
            }
        >
            <div className={cls.picture}>
                <Img imageId={itemData.pictureName} />
            </div>
            {!children &&
                <>
                    <div className={cls.contentwrapper}>
                        <h3 className={cls[listItemElementsClasses.TITLE]}>{truncate(getTitleField(itemData), 35)}</h3>
                        {Object.keys(content).map(key =>
                            <div className={cls[content[key].elemClass]} key={key}>
                                {(redundant && `${key}: `)}{truncate(content[key].data, 64)}
                            </div>
                        )}
                    </div>
                </>
            }
            {!!buttons &&
                <div className={cls.buttons}>
                    {buttons.map(button => 
                        <Button className={ButtonThemes.BASIC} key={button.title} action={(e) => button.action(itemData, e)}>
                            {button.title}
                        </Button>)
                    }
                </div>
            }
            {itemData.date && !redundant &&
                <span className={cls.date}>
                    {transformDate(new Date(itemData.date))}
                </span>
            }
        </div>
    )
}