import { useClassNames } from '../shared/useClassnames'
import { Appouter } from './providers/routesProvider/UI/Router'
import { useTheme } from './providers/themeProvider/lib/useTheme'
import './styles/App.css'

function App() {
    const { theme } = useTheme()

  return (
    <div className={useClassNames('app', [theme])}>
        <Appouter/>
    </div>
  )
}

export default App
