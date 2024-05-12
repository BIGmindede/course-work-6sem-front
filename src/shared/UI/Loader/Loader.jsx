import cls from './Loader.module.scss'

export const Loader = () => {
    return (
        <div className={cls.loaderwrapper}>
            <div className={cls.loader}/>
        </div>
    )
}