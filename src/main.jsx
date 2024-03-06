import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'app/App.jsx'
import { ThemeProvider } from 'app/providers/themeProvider/index.js'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'shared/config/store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
