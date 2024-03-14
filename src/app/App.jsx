import { useClassNames } from 'shared/lib/useClassNames'
import { Header } from 'widgets/Header/Header'
import { AppRouter } from './providers/routesProvider/UI/Router'
import { useTheme } from './providers/themeProvider/lib/useTheme'
import './styles/index.scss'
import { Suspense, useEffect } from 'react'
import { checkAuthority } from 'shared/config/store/actionCreators/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserData } from 'shared/config/store/reducers/AuthSlice'
import { Sidebar } from 'widgets/Sidebar'
import { Options } from 'widgets/Options/Options'

function App() {
    const { theme } = useTheme()
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuthority())
    }, [])

    const authorization = useSelector(selectUserData)

  return (
    <div className={useClassNames('app', [theme])}>
        <Header/>
        {
            authorization !== null &&
            (authorization.role === 'admin' ||
            authorization.role === 'moderator') &&
            <Suspense fallback=''><Sidebar/></Suspense>
        }
        <AppRouter/>
        <Options/>
    </div>
  )
}

export default App
