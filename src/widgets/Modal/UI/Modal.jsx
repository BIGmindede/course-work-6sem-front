import cls from './Modal.module.scss'
import { Closer } from 'shared/UI/Closer/Closer'

export default ({ children, closer, header }) => {
    return (
        <div className={cls.modalwrapper}>
            <div className={cls.modal}>
                <div className={cls.cap}>
                    <h3>{header}</h3>
                    <Closer action={closer}/>
                </div>
                {children}
            </div>
        </div>
    )
}