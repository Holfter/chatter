import React from 'react'
import {createTheme, Theme} from '@mui/material/styles'
import muiTheme from '../theme/muiTheme'

interface ColorModeType {
  colorMode: {
    toggleColorMode: () => void
  }
  theme: Theme
}

const initialValues = {
  colorMode: {toggleColorMode: () => {}},
  theme: createTheme(),
}

const ColorModeContext = React.createContext<ColorModeType | null>(
  initialValues,
)

interface ColorModeProviderProps {
  children: React.ReactNode
}

export const ColorModeProvider = (props: ColorModeProviderProps) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )
  const theme = React.useMemo(() => muiTheme(mode), [mode])

  return <ColorModeContext.Provider value={{colorMode, theme}} {...props} />
}

export const useColorMode = () => {
  const context = React.useContext(ColorModeContext)
  if (!context) {
    throw new Error(
      'useColorMode may only be used from within a (child of a) ColorModeProvider.',
    )
  }
  return context
}
