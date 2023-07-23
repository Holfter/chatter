import '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    hover_color: Palette['primary']
  }
  interface PaletteOptions {
    hover_color: PaletteOptions['primary']
  }
}
