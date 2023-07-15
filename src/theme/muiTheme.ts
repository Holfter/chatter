import {createTheme} from '@mui/material/styles'

const muiTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {
              main: '#44a1fc',
              light: '#73baff',
              dark: '#0880f9',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#d44747',
              light: '#ef8181',
              dark: '#ad2121',
              contrastText: '#ffffff',
            },
            text: {
              primary: 'rgba(20,20,20,0.87)',
              secondary: 'rgba(123,123,123,0.6)',
              disabled: 'rgba(103,103,103,0.38)',
            },
            error: {
              main: '#d32f2f',
            },
            warning: {
              main: '#ed6c02',
            },
            info: {
              main: '#0288d1',
            },
            success: {
              main: '#2e7d32',
            },
            divider: 'rgba(119,116,116,0.12)',
            background: {
              default: '#ffffff',
              paper: '#ffffff',
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: '#44a1fc',
              light: '#73baff',
              dark: '#0880f9',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#d44747',
              light: '#ef8181',
              dark: '#ad2121',
              contrastText: '#ffffff',
            },
            text: {
              primary: 'rgba(255,255,255,0.87)',
              secondary: 'rgba(197,197,197,0.6)',
              disabled: 'rgba(103,103,103,0.38)',
            },
            error: {
              main: '#d32f2f',
            },
            warning: {
              main: '#ed6c02',
            },
            info: {
              main: '#0288d1',
            },
            success: {
              main: '#2e7d32',
            },
            divider: 'rgba(212,210,210,0.12)',
            background: {
              default: '#1c1c1c',
              paper: '#1c1c1c',
            },
          }),
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            margin: '15px',
            '& fieldset': {
              borderRadius: '15px',
              border: 'none',
              '&:focus': {
                outline: 'none !important',
              },
            },
            '& input': {
              borderRadius: '16px !important',
              background:
                mode === 'light' ? '#f5f7fb !important' : '#262626 !important',
            },
            '& label': {
              fontSize: '14px',
              lineHeight: '24px',
            },
          },
        },
      },
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
                  '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
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
                  '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
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
  })

export default muiTheme
