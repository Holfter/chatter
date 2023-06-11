import {Avatar, Box, Icon, IconButton, Tooltip, Typography} from '@mui/material'
import {IUser} from '../../../types/IUser'

const headerIcons = [
  {title: 'Call', icon: 'call_icon'},
  {title: 'Video Call', icon: 'videocam_icon'},
  {title: 'Search', icon: 'search_icon'},
  {title: 'Settings', icon: 'settings_icon'},
]

interface ChatBoxHeaderProps {
  currentFriend: IUser | null
}

const ChatBoxHeader = ({currentFriend}: ChatBoxHeaderProps) => {
  return (
    <Box
      height={{sm: '50px', md: '72px'}}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={theme => `1px solid ${theme.palette.divider}`}
      padding="0 21px"
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar
          sx={{width: 40, height: 40}}
          src={currentFriend?.photoURL}
          alt="currentUserFriend"
        />
        <Box>
          <Typography>{currentFriend?.displayName}</Typography>
          <Typography variant="caption" color="green">
            online
          </Typography>
        </Box>
      </Box>
      <Box>
        {headerIcons.map(item => (
          <Tooltip title={item.title}>
            <IconButton>
              <Icon>{item.icon}</Icon>
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    </Box>
  )
}

export default ChatBoxHeader
