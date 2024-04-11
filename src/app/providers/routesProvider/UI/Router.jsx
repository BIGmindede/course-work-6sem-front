import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { selectSidebarCollapsed } from 'shared/config/store/reducers/SidebarSlice'
import { basicRouterConfig, adminRouterConfig } from '../config/routerConfig'
import { selectUserData } from 'shared/config/store/reducers/AuthSlice'

export const AppRouter = () => {

    const pageCollapsed = !useSelector(selectSidebarCollapsed)

    const authorization = useSelector(selectUserData)

    return (
        <Routes>
            {
                adminRouterConfig.map(({ path, element }) =>
                    <Route key={path} path={path} element={
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <div className={['pagewrapper', pageCollapsed ? 'collapsed' : 'opened'].join(' ')}>
                                {authorization !== null &&
                                    (authorization.role === 'admin')
                                    ? element
                                    : <div>Access Denied</div>
                                }
                            </div>
                        </Suspense>
                    }/>
                )
            }
            {
                basicRouterConfig.map(({ path, element }) =>
                <Route key={path} path={path} element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <div className={['pagewrapper', pageCollapsed ? 'collapsed' : 'opened'].join(' ')}>
                            {element}
                        </div>
                    </Suspense>
                }/>
            )
            }
        </Routes>
    )
}