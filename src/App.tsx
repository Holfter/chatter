import {ThemeProvider} from '@mui/material/styles'
import {useColorMode} from './contexts/ColorModeContext'
import Sidebar from './components/Sidebar'

function App() {
  const {theme} = useColorMode()
  return (
    <ThemeProvider theme={theme}>
      <Sidebar>content</Sidebar>
    </ThemeProvider>
  )
}

export default App
