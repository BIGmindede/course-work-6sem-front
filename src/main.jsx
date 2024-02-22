import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import { ThemeProvider } from './app/providers/themeProvider/index.js'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
