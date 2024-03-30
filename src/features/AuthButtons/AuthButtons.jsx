import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useClassNames } from 'shared/lib/useClassNames'
import cls from './AuthButtons.module.scss'
import { Button } from 'shared/UI/Button/Button'
import { ButtonThemes } from 'shared/UI/Button/Button'
import { DialogWindow } from 'features/DialogWindow/DialogWindow'
import { Form } from 'entities/Form/Form'
import { login, logout, registration } from 'shared/config/store/actionCreators/authActions'
import { changeCollapsed } from 'shared/config/store/reducers/SidebarSlice'


export const AuthButtons = ({ className, authorized }) => {
    const [buttonActive, setButtonActive] = useState(null)

    const dispatch = useDispatch()

    return (
        <div className={useClassNames(cls.authbuttons, [cls[className]])}>
            {authorized
                ? <>
                    <Button action={() => {setButtonActive('login')}}
                        className={ButtonThemes.BASIC}>Войти</Button>
                    <Button action={() => setButtonActive('registration')}
                        className={ButtonThemes.BASIC}>Регистрация</Button>
                    {buttonActive === 'login' &&
                        <DialogWindow closer={() => setButtonActive(null)}>
                        <Form
                            fields={[
                                {type: 'email', placeholder: 'E-mail'},
                                {type: 'password', placeholder: 'Пароль'}
                            ]}
                            action={(email, password) => dispatch(login(email, password))}
                            buttonText='Войти'
                        />
                        </DialogWindow>
                    }
                    {buttonActive === 'registration' &&
                        <DialogWindow closer={() => setButtonActive(null)}>
                        <Form
                            fields={[
                                {type: 'email', placeholder: 'E-mail'},
                                {type: 'password', placeholder: 'Пароль'}
                            ]}
                            action={(email, password) => dispatch(registration(email, password))}
                            buttonText='Регистрация'
                        />
                        </DialogWindow>
                    }
                </>
                : <>
                    <Button action={() => {}} 
                        className={ButtonThemes.BASIC}>Профиль</Button>
                    <Button 
                        action={() => {
                            dispatch(logout())
                            dispatch(changeCollapsed(true))
                        }}
                        className={ButtonThemes.BASIC}>Выйти</Button>
                </>
            }
            
        </div>
    )
}
