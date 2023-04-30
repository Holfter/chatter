import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ColorModeProvider} from './contexts/ColorModeContext.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Error 404</div>,
    children: [
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeProvider>
      <RouterProvider router={router} />
    </ColorModeProvider>
  </React.StrictMode>,
)
