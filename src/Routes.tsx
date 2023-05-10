import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Login from './pages/Login/index.tsx'
import Register from './pages/Register/index.tsx'
import {ThemeProvider} from '@mui/material/styles'
import {useColorMode} from './contexts/ColorModeContext'
import PrivateRoute from './components/PrivateRoute/index.tsx'

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
        element: <Profile />,
      },
      {
        path: '/chat',
        element: <Chat />,
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
