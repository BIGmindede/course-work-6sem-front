import { useClassNames } from 'shared/lib/useClassNames'
import cls from './EntityCreator.module.scss'
import { Form } from 'entities/Form/Form'

export const EntityCreator = ({ className, title, fields, action, buttonText }) => {
    
    return (
        <div className={useClassNames(cls.entitycreator, [cls[className]])}>
            <h2>{title}</h2>
            <Form
                fields={fields}
                action={action}
                buttonText={buttonText}
            />
        </div>
    )
}