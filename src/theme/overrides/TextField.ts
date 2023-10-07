import {Theme} from '@mui/material/styles'

export default function TextField(theme: Theme) {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: theme.palette.hover_color.main,
          '& fieldset': {
            borderRadius: '15px',
            border: 'none',
            '&:focus': {
              outline: 'none !important',
            },
          },
          '& label': {
            fontSize: '14px',
            lineHeight: '24px',
          },
        },
      },
    },
  }
}
