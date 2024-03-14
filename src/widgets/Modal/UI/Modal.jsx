import CancelIcon from 'shared/assets/CancelIcon.svg?react'
import cls from './Modal.module.scss'

export default ({ children, closer }) => {
    return (
        <div className={cls.modalwrapper}>
            <div className={cls.modal}>
                {children}
                <span className={cls.closer} onClick={closer}><CancelIcon/></span>
            </div>
        </div>
    )
}