import cls from './Modal.module.scss'
import { Closer } from 'shared/UI/Closer/Closer'

export default ({ children, closer, header }) => {
    return (
        <div className={cls.modalwrapper} onClick={closer}>
            <div className={cls.modalbody} onClick={e => e.stopPropagation()}>
                <div className={cls.cap}>
                    <h3>{header}</h3>
                    <Closer action={closer}/>
                </div>
                <div className={cls.modalcontent}>
                    {children}
                </div>
            </div>
        </div>
    )
}