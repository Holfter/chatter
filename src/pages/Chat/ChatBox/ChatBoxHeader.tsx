import {
  Avatar,
  Box,
  Icon,
  IconButton,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import {useChat} from '../../../contexts/ChatContext'
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
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const {setCurrentChatUser} = useChat()
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
        {isMobile && (
          <IconButton onClick={() => setCurrentChatUser(null)}>
            <Icon>keyboard_arrow_left</Icon>
          </IconButton>
        )}
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
            <IconButton size="small">
              <Icon fontSize="small">{item.icon}</Icon>
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    </Box>
  )
}

export default ChatBoxHeader
