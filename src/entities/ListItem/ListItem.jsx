import { useClassNames } from 'shared/lib/useClassNames'
import cls from './ListItem.module.scss'
import { Button, ButtonThemes } from 'shared/UI/Button/Button'

export const ListItem = ({ className, itemData, buttons, dataTransformer }) => {

    const content = dataTransformer(itemData)

    return (
        <div className={useClassNames(cls.listitem, [cls[className]])}>
            <div>
                {Object.keys(content).map(key => <div key={key}>{key}: {content[key]}</div>)}
            </div>
            <div className={cls.buttons}>
                {!!buttons && buttons.map(button => 
                    <Button className={ButtonThemes.BASIC} key={button.title} action={(e) => button.action(itemData, e)}>
                        {button.title}
                    </Button>)
                }
            </div>
        </div>
    )
}