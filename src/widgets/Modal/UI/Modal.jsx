import CancelIcon from 'shared/assets/CancelIcon.svg?react'
import cls from './Modal.module.scss'
import { Closer } from 'shared/UI/Closer/Closer'

export default ({ children, closer }) => {
    return (
        <div className={cls.modalwrapper}>
            <div className={cls.modal}>
                {children}
                <Closer action={closer}/>
            </div>
        </div>
    )
}