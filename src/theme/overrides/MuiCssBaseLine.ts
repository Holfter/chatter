import {Theme} from '@mui/material/styles'

export default function MuiCssBaseline(theme: Theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...(theme.palette.mode === 'light'
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
                '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
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
                '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                  backgroundColor: '#212121',
                },
              }),
        },
      },
    },
  }
}
