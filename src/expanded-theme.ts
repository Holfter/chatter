import '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    hover_color: Palette['primary']
    text_color: PaletteOptions
  }
  interface PaletteOptions {
    hover_color: Palette['primary']
    text_color: {
      soft: string
    }
  }
}
