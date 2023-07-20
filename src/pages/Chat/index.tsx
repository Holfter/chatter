import {Box} from '@mui/material'

import {useChat} from '../../contexts/ChatContext'
import ChatBox from './ChatBox'
import SidebarChat from './SidebarChat/Sidebar'

const Chat = () => {
  const {currentChatUser} = useChat()
  return (
    <Box display="flex" height="100%" width="100%">
      <SidebarChat />
      {currentChatUser && <ChatBox currentFriend={currentChatUser} />}
    </Box>
  )
}

export default Chat
