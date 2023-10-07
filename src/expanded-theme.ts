import '@mui/material/styles/createPalette'
import {TypeBackground} from '@mui/material/styles/createPalette'

interface Background extends TypeBackground {}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    hover_color: {
      main: string
    }
    text_color: {
      soft: string
    }
    background: Background
  }
  interface PaletteOptions {
    hover_color: {
      main: string
    }
    text_color: {
      soft: string
    }
  }
}
