import {ThemeProvider} from '@mui/material/styles'
import {useColorMode} from './contexts/ColorModeContext'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Chat from './pages/Chat'
import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat />,
    errorElement: <div>Error 404</div>,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
])

function App() {
  const {theme} = useColorMode()
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
