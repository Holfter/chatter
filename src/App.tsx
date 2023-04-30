import {ThemeProvider} from '@mui/material/styles'
import {useColorMode} from './contexts/ColorModeContext'
import Layout from './theme/Layout'

function App() {
  const {theme} = useColorMode()
  return (
    <ThemeProvider theme={theme}>
      <Layout>Content</Layout>
    </ThemeProvider>
  )
}

export default App
