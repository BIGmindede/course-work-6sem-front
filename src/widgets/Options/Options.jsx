import { useClassNames } from 'shared/lib/useClassNames'
import { Button, ButtonThemes } from 'shared/UI/Button/Button'
import { Themes, useTheme } from 'app/providers/themeProvider'
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon.svg?react'
import RequestsIcon from 'shared/assets/icons/RequestsIcon.svg?react'
import LightThemeIcon from 'shared/assets/icons/LightThemeIcon.svg?react'
import DarkThemecIcon from 'shared/assets/icons/DarkThemeIcon.svg?react'
import cls from './Options.module.scss'
import { Suspense, useState } from 'react'
import { Modal } from 'widgets/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { createRequest } from 'shared/config/store/actionCreators/requestActions'
import { selectUserData } from 'shared/config/store/reducers/AuthSlice'
import { Form } from 'entities/Form/Form'

export const Options = ({ className }) => {

    const { theme, handleThemeChange } = useTheme()

    const [collapsed, setCollapsed] = useState(true)

    const [modalActive, setModalActive] = useState(false)

    const dispatch = useDispatch()
    
    const authorization = useSelector(selectUserData)
    const userId = authorization && authorization.id

    return (
        <div className={useClassNames(cls.options, [cls[className], collapsed && cls.collapsed])}>
            {modalActive &&
                <Suspense fallback=''>
                    <Modal 
                        closer={() => setModalActive(false)}
                        header={'Оставить заявку'}
                    >
                        <Form
                            fields={[
                                {
                                    type: 'text',
                                    placeholder: 'Заголовок заявки',
                                    upperLabel: 'Заголовок заявки'
                                },
                                {
                                    type: 'textarea',
                                    placeholder: 'Содержание заявки',
                                    upperLabel: 'Содержание заявки'
                                }
                            ]}
                            action={(title, content) => {
                                setModalActive(false)
                                return dispatch(createRequest(title, content, userId))
                            }}
                            buttonText={'Отправить'}
                        />
                    </Modal>
                </Suspense>
            }
            <div className={cls.optionswrapper}>
                <Button action={handleThemeChange} className={ButtonThemes.ROUND}>
                    {theme === Themes.LIGHT
                        ? <DarkThemecIcon/>
                        : <LightThemeIcon/>
                    }
                </Button>
                {authorization &&
                    <Button action={() => setModalActive(true)} className={ButtonThemes.ROUND}>
                        <RequestsIcon/>
                    </Button>
                }
            </div>
            <Button action={() => {setCollapsed(!collapsed)}} className={ButtonThemes.ROUND}>
                <ArrowDownIcon className={cls.arrowdownicon}/>
            </Button>
        </div>
    )
}