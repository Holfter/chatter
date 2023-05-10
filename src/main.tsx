import React from 'react'
import ReactDOM from 'react-dom/client'
import {ColorModeProvider} from './contexts/ColorModeContext.tsx'
import Routes from './Routes.tsx'
import {AuthProvider} from './contexts/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ColorModeProvider>
  </React.StrictMode>,
)
