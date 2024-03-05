import { Route, Routes } from 'react-router-dom'
import { routerConfig } from '../config/routerConfig'
import { Suspense } from 'react'

export const AppRouter = () => {
  return (
    <Routes>
        {
            routerConfig.map(({ path, element }) =>
                <Route key={path} path={path} element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <div className='pageWrapper'>
                            {element}
                        </div>
                    </Suspense>
                }/>
            )
        }
    </Routes>
  )
}