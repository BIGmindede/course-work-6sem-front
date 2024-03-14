import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import cls from './Header.module.scss'
import { useClassNames } from 'shared/lib/useClassNames'
import { AuthButtons } from 'features/AuthButtons/AuthButtons'
import { SearchBox } from 'features/SearchBox/SearchBox'
import { LogoBox } from 'features/LogoBox/LogoBox'
import { SidebarToggler } from 'features/SidebarToggler'
import { selectUserData } from 'shared/config/store/reducers/AuthSlice'

export const Header = ({ className }) => {
    const authorization = useSelector(selectUserData)

    return (
        <div className={useClassNames(cls.header, [cls[className]])}>
            <div className={cls.navshortcut}>
                {
                    authorization !== null &&
                    (authorization.role === 'admin' ||
                    authorization.role === 'moderator') &&
                    <Suspense fallback=''><SidebarToggler/></Suspense>
                }
                <LogoBox/>
            </div>
            <SearchBox/>
            <AuthButtons authorized={authorization === null}/>
        </div>
    )
}