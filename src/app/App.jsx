import { useClassNames } from '../shared/useClassnames'
import { useTheme } from './providers/themeProvider/lib/useTheme'
import './styles/App.css'

function App() {
    const { theme } = useTheme()

  return (
    <div className={useClassNames('app', [theme])}>
    </div>
  )
}

export default App
