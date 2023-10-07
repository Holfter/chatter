import {createTheme} from '@mui/material/styles'
import palette from './palette'
import typography from './typography'

const muiTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: palette(mode),
    //shape: {borderRadius: 6},
    typography,
    //shadows: shadows(),
  })

export default muiTheme
