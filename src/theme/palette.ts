import darkModePalette from './darkModePalette'
import lightModePalette from './lightModePalette'

const palette = (mode: 'light' | 'dark') => ({
  mode,
  ...(mode === 'light' ? lightModePalette : darkModePalette),
})

export default palette
