import {Box, styled, Theme} from '@mui/material'

interface ChatSidebarProps {
  theme?: Theme
  isChatActive?: boolean
}

export const ChatRow = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  padding: '8px',
  cursor: 'pointer',
}))

export const ColumnFlexBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

// isChatActive is used to hide the component on mobile if there's an active chat
export const ChatSidebar = styled(Box)<ChatSidebarProps>(
  ({theme, isChatActive}) => ({
    width: 300,
    height: '100%',
    borderRight: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: isChatActive ? 'none' : 'flex',
      width: '100%',
    },
    flexDirection: 'column',
    padding: '8px',
  }),
)
