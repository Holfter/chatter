import {ThemeProvider} from '@mui/material/styles'
import {useColorMode} from './contexts/ColorModeContext'
import {Outlet} from 'react-router-dom'
import Layout from './theme/Layout'

function App() {
  const {theme} = useColorMode()
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  )
}

export default App
