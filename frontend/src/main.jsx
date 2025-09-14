import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from "@mui/material/styles";


const theme = createTheme({
    // buraya global tema ayarları gelebilir (isteğe bağlı)
});



createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
)
