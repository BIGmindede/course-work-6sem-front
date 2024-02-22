import { useClassNames } from 'shared/lib/useClassNames'
import { Header } from 'widgets/Header/Header'
import { Appouter } from './providers/routesProvider/UI/Router'
import { useTheme } from './providers/themeProvider/lib/useTheme'
import './styles/index.scss'

function App() {
    const { theme } = useTheme()

  return (
    <div className={useClassNames('app', [theme])}>
        <Header/>
        <Appouter/>
    </div>
  )
}

export default App
