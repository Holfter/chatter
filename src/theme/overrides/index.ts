//
import {Theme} from '@mui/material/styles'
import MuiCssBaseline from './MuiCssBaseLine'
import Paper from './Paper'
import TextField from './TextField'

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(Paper(), TextField(theme), MuiCssBaseline(theme))
}
