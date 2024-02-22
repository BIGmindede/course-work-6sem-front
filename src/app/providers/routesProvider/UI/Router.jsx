import { Route, Routes } from 'react-router-dom'
import { routerConfig } from '../config/routerConfig'

export const Appouter = () => {
  return (
    <Routes>
        {
            routerConfig.map(({ path, element }) =>
                <Route key={path} path={path} element={
                    <div className='pageWrapper'>
                        {element}
                    </div>
                }/>
            )
        }
    </Routes>
  )
}