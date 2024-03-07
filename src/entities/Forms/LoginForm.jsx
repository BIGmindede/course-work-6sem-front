import { Form } from 'entities/Form/Form'
import { useDispatch } from 'react-redux'
import { login } from 'shared/config/store/actionCreators/authActions'

export const LoginForm = () => {

    const dispatch = useDispatch()

    return (
        <Form
            fields={[
                {type: 'email', placeholder: 'E-mail', value: 'email'},
                {type: 'password', placeholder: 'Пароль', value: 'password'}
            ]}
            action={(email, password) => dispatch(login(email, password))}
            buttonText='Войти'
        />
    )
}