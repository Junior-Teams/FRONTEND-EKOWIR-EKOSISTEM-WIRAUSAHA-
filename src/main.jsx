import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/components/query-provider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster position="top-center" />
        <App />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
)
