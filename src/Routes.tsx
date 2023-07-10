import {ThemeProvider} from '@mui/material/styles'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.tsx'
import PrivateRoute from './components/PrivateRoute/index.tsx'
import {ChatProvider} from './contexts/ChatContext.tsx'
import {useColorMode} from './contexts/ColorModeContext'
import Chat from './pages/Chat'
import Login from './pages/Login/index.tsx'
import Profile from './pages/Profile'
import Register from './pages/Register/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    errorElement: <div>Error 404</div>,
    children: [
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: '/chat',
        element: (
          <PrivateRoute>
            <ChatProvider>
              <Chat />
            </ChatProvider>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

const Routes = () => {
  const {theme} = useColorMode()
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default Routes
