import { Form } from "entities/Form/Form"
import { useDispatch } from "react-redux"
import { registration } from 'shared/config/store/actionCreators/authActions'

export const RegistrationForm = () => {

    const dispatch = useDispatch()

    return (
        <Form
            fields={[
                {type: 'email', placeholder: 'E-mail', value: 'email'},
                {type: 'password', placeholder: 'Пароль', value: 'password'}
            ]}
            action={(email, password) => dispatch(registration(email, password))}
            buttonText='Регистрация'
        />
    )
}