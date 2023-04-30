import React from 'react'
import {createTheme, Theme} from '@mui/material/styles'

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
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                ...(mode === 'light'
                  ? {
                      scrollbarColor: '#757575',
                      '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 7,
                        backgroundColor: 'transparent',
                      },
                      '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb':
                        {
                          borderRadius: 8,
                          backgroundColor: '#757575',
                          minHeight: 24,
                        },
                      '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
                        {
                          backgroundColor: '#959595',
                        },
                      '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
                        {
                          backgroundColor: '#959595',
                        },
                      '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
                        {
                          backgroundColor: '#959595',
                        },
                      '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner':
                        {
                          backgroundColor: '#757575',
                        },
                    }
                  : {
                      scrollbarColor: '#212121',
                      '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 7,
                        backgroundColor: '#212121',
                      },
                      '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb':
                        {
                          borderRadius: 8,
                          backgroundColor: '#424040',
                          minHeight: 24,
                        },
                      '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
                        {
                          backgroundColor: '#212121',
                        },
                      '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
                        {
                          backgroundColor: '#424040',
                        },
                      '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
                        {
                          backgroundColor: '#545151',
                        },
                      '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner':
                        {
                          backgroundColor: '#212121',
                        },
                    }),
              },
            },
          },
        },
      }),
    [mode],
  )
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
