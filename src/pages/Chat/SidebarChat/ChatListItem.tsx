import {Avatar, Box, Typography} from '@mui/material'
import {useChat} from '../../../contexts/ChatContext'
import useUserChats from '../../../hooks/useUserChats'
import {ChatRow, ColumnFlexBox} from '../styles'

const ChatList = () => {
  const {userChats} = useUserChats()
  const {setCurrentChatUser} = useChat()

  return (
    <Box>
      {Object.entries(userChats)?.map(chat => (
        <ChatRow
          mb={2}
          className="userChat"
          key={chat[0]}
          onClick={() => setCurrentChatUser(chat[1].userInfo)}
        >
          <Avatar
            alt={chat[1].userInfo?.displayName}
            src={chat[1].userInfo?.photoURL}
            sx={{width: 50, height: 50, mr: 2}}
          />
          <ColumnFlexBox>
            <Typography variant="body1">
              {chat[1].userInfo?.displayName}
            </Typography>
            <Typography variant="body2">{chat[1].lastMessage?.text}</Typography>
          </ColumnFlexBox>
        </ChatRow>
      ))}
    </Box>
  )
}

export default ChatList
