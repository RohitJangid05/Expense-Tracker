import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ExpenseContextProvider from './ContextApi/ExpenseContext.jsx'


createRoot(document.getElementById('root')).render(
    <ExpenseContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ExpenseContextProvider>
)
