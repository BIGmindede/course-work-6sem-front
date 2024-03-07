import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useClassNames } from 'shared/lib/useClassNames'
import cls from './AuthButtons.module.scss'
import { Button } from 'shared/UI/Button/Button'
import { ButtonThemes } from 'shared/UI/Button/Button'
import { DialogWindow } from 'features/DialogWindow/DialogWindow'
import { LoginForm } from 'entities/Forms/LoginForm'
import { RegistrationForm } from 'entities/Forms/RegistrationForm'


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
                        <LoginForm/>
                        </DialogWindow>
                    }
                    {buttonActive === 'registration' &&
                        <DialogWindow closer={() => setButtonActive(null)}>
                        <RegistrationForm/>
                        </DialogWindow>
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
