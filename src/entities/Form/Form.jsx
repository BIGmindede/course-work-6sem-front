import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Form.module.scss'
import { Button } from 'shared/UI/Button/Button'
import { ButtonThemes } from 'shared/UI/Button/Button'
import { useRef } from 'react'

export const Form = ({ className, fields, action, buttonText }) => {
    const inputsContainterRef = useRef()
    const inputsRefs = useRef([])

    const handleFormAction = (e) => {
        e.preventDefault()
        inputsRefs.current = Array.from(inputsContainterRef.current.children).map((el) => el)
        const values = inputsRefs.current.filter(el => el.tagName === 'INPUT').map(el => el.value)
        action(...values)
    }

    return (
        <form ref={inputsContainterRef} className={useClassNames(cls.form, [cls[className]])}>
            {
                fields.map(field => <input key={field.placeholder} type={field.type} placeholder={field.placeholder}/>)
            }
            <Button action={(e) => handleFormAction(e)} className={ButtonThemes.BASIC}>{buttonText}</Button>
        </form>
    )
}