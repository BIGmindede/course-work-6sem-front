import { useState } from 'react'
import cls from './Form.module.scss'
import { useClassNames } from 'shared/lib/useClassNames'
import { Button } from 'shared/UI/Button/Button'
import { ButtonThemes } from 'shared/UI/Button/Button'
import { Input } from 'shared/UI/Input/Input'

export const Form = ({ className, fields, action, buttonText }) => {

    const initialState = {...fields.map((field) => field.preset ?? '')}

    const [inputsValues, setInputsValues] = useState(initialState)

    const handleFormAction = (e) => {
        e.preventDefault()
        const values = Object.values(inputsValues)
        action(...values)
        setInputsValues(initialState)
    }

    return (
        <form className={useClassNames(cls.form, [cls[className]])}>
            {
                fields.map((field, index) =>
                    <Input
                        inputValue={field.preset ?? inputsValues[index]}
                        setInputValue={(value) => setInputsValues({...inputsValues, [index]: value})}
                        key={index}
                        type={field.type}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        upperLabel={field.upperLabel}
                    />
                )
            }
            <Button action={(e) => handleFormAction(e)} className={ButtonThemes.BASIC}>{buttonText}</Button>
        </form>
    )
}