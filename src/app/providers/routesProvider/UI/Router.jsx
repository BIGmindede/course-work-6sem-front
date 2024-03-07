import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { selectSidebarCollapsed } from 'shared/config/store/reducers/SidebarSlice'
import { routerConfig } from '../config/routerConfig'

export const AppRouter = () => {

    const pageCollapsed = !useSelector(selectSidebarCollapsed)

    return (
        <Routes>
            {
                routerConfig.map(({ path, element }) =>
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