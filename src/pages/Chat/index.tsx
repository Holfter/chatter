import {useState} from 'react'
import {Box} from '@mui/material'
import {IUser} from '../../types/IUser'

import SidebarChat from './Sidebar'
import ChatBox from './ChatBox'

const Chat = () => {
  const [currentFriend, setCurrentFriend] = useState<IUser | null>(null)
  return (
    <Box display="flex" height="100%" width="100%">
      <SidebarChat onUserSelect={user => setCurrentFriend(user)} />
      <ChatBox currentFriend={currentFriend} />
    </Box>
  )
}

export default Chat
