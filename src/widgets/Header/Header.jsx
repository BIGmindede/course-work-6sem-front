import { useClassNames } from 'shared/lib/useClassNames'
import cls from './Header.module.scss'
import { AuthButtons } from 'features/AuthButtons/AuthButtons'
import { SearchBox } from 'features/SearchBox/SearchBox'
import { LogoBox } from 'features/LogoBox/LogoBox'
import { SidebarToggler } from 'features/SidebarToggler'
import { useSelector } from 'react-redux'
import { selectUserData } from 'shared/config/store/reducers/AuthSlice'

export const Header = ({ className }) => {
    const authorization = useSelector(selectUserData)

    console.log(authorization)

    return (
        <div className={useClassNames(cls.header, [cls[className]])}>
            <div>
                {
                    authorization !== null &&
                    (authorization.role === 'admin' ||
                    authorization.role === 'moderator') &&
                    <SidebarToggler/>
                }
                <LogoBox/>
            </div>
            <SearchBox/>
            <AuthButtons authorized={authorization === null}/>
        </div>
    )
}