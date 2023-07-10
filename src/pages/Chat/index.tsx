import {Box} from '@mui/material'

import {useChat} from '../../contexts/ChatContext'
import ChatBox from './ChatBox'
import SidebarChat from './Sidebar'

const Chat = () => {
  const {currentChatUser, setCurrentChatUser} = useChat()
  return (
    <Box display="flex" height="100%" width="100%">
      <SidebarChat onUserSelect={user => setCurrentChatUser(user)} />
      {currentChatUser && <ChatBox currentFriend={currentChatUser} />}
    </Box>
  )
}

export default Chat
