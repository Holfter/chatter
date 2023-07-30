import {Box, styled, Theme} from '@mui/material'

interface ChatSidebarProps {
  theme?: Theme
  isChatActive?: boolean
}

export const ChatRow = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  padding: '8px',
  cursor: 'pointer',
  borderRadius: '15px',
  '&:hover': {
    background: theme.palette.hover_color.main,
  },
}))

// isChatActive is used to hide the component on mobile if there's an active chat
export const ChatSidebar = styled(Box)<ChatSidebarProps>(
  ({theme, isChatActive}) => ({
    width: 350,
    height: '100%',
    borderRight: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: isChatActive ? 'none' : 'flex',
      width: '100%',
    },
    [theme.breakpoints.down('lg')]: {
      width: 300,
    },
    flexDirection: 'column',
    padding: '8px',
  }),
)
