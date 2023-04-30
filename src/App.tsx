import {ThemeProvider} from '@mui/material/styles'
import {useColorMode} from './contexts/ColorModeContext'

function App() {
  const {theme} = useColorMode()
  return <ThemeProvider theme={theme}></ThemeProvider>
}

export default App
