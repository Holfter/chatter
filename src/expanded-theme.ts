import '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    hover_color: PaletteOptions
    text_color: PaletteOptions
  }
  interface PaletteOptions {
    hover_color: {
      primary?: string
      secondary?: string
      main: string
    }
    text_color: {
      soft: string
    }
  }
}
