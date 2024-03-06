import { useClassNames } from 'shared/lib/useClassNames'
import cls from './AuthButtons.module.scss'
import { Button } from 'shared/UI/Button/Button'
import { ButtonThemes } from 'shared/UI/Button/Button'
import { Form } from '../Form'
import { Suspense, useState } from 'react'
import { registration, login, logout } from 'shared/config/store/actionCreators/authActions'
import { DialogWindow } from '../DialogWindow'
import { useDispatch } from 'react-redux'


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
                        <Suspense fallback=''>
                        <DialogWindow closer={() => setButtonActive(null)}>
                        <Form
                            fields={[
                                {type: 'email', placeholder: 'E-mail', value: 'email'},
                                {type: 'password', placeholder: 'Пароль', value: 'password'}
                            ]}
                            action={(email, password) => dispatch(login(email, password))}
                            buttonText='Войти'
                        />
                        </DialogWindow>
                        </Suspense>
                    }
                    {buttonActive === 'registration' &&
                        <Suspense fallback=''>
                        <DialogWindow closer={() => setButtonActive(null)}>
                        <Form
                            fields={[
                                {type: 'email', placeholder: 'E-mail', value: 'email'},
                                {type: 'password', placeholder: 'Пароль', value: 'password'}
                            ]}
                            action={(email, password) => dispatch(registration(email, password))}
                            buttonText='Регистрация'
                        />
                        </DialogWindow>
                        </Suspense>
                    }
                </>
                : <>
                    <Button action={() => {}} 
                        className={ButtonThemes.BASIC}>Профиль</Button>
                    <Button action={() => dispatch(logout())}
                        className={ButtonThemes.BASIC}>Выйти</Button>
                </>
            }
            
        </div>
    )
}
