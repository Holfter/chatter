import {useState} from 'react'
import {Box} from '@mui/material'
import {styled} from '@mui/material/styles'
import {IUser} from '../../types/IUser'
import {useAuth} from '../../contexts/AuthContext'
import {sendMessage} from './helpers/handlers'
import useQueryUsers from '../../hooks/useQueryUsers'
import useUserChats from '../../hooks/useUserChats'
import useChatMessages from '../../hooks/useChatMessages'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'

const ChatSidebar = styled(Box)(() => ({
  width: 300,
  height: '100vh',
  border: '1px solid black',
  display: 'flex',
  flexDirection: 'column',
}))
const ColumnFlexBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

const RowFlexBox = styled(Box)(() => ({
  display: 'flex',
}))

const Chat = () => {
  const [currentFriend, setCurrentFriend] = useState<IUser | null>(null)
  const [searchInput, setSearchInput] = useState<string>('')
  const [text, setText] = useState<string>('')
  const {currentUser} = useAuth()
  const {users} = useQueryUsers(searchInput)
  const {userChats} = useUserChats()
  const {chatMessages} = useChatMessages(currentFriend)

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value?.toLowerCase())
  }

  async function handleSendMessage() {
    await sendMessage({currentUser, currentFriend, text})
    setText('')
  }

  return (
    <Box display="flex">
      <ChatSidebar>
        <TextField
          onChange={handleSearchUser}
          value={searchInput}
          type="text"
          label="Search or start new chat"
        />
        <ColumnFlexBox>
          {users &&
            users.map(user => (
              <RowFlexBox>
                <img
                  onClick={() => setCurrentFriend(user)}
                  width={50}
                  src={user.photoURL}
                  alt={user.displayName}
                />
                <div>{user.displayName}</div>
              </RowFlexBox>
            ))}
          <div>
            {Object.entries(userChats)?.map(chat => (
              <RowFlexBox
                className="userChat"
                key={chat[0]}
                //onClick={() => handleSelect(chat[1].userInfo)}
              >
                <Avatar
                  onClick={() => setCurrentFriend(chat[1].userInfo)}
                  alt={chat[1].userInfo.displayName}
                  src={chat[1].userInfo.photoURL}
                  sx={{width: 50, height: 50, mr: 2}}
                />
                <ColumnFlexBox>
                  <span>{chat[1].userInfo.displayName}</span>
                  <span>{chat[1].lastMessage?.text}</span>
                </ColumnFlexBox>
              </RowFlexBox>
            ))}
          </div>
        </ColumnFlexBox>
      </ChatSidebar>
      <Box width="100%">
        <ColumnFlexBox height="100vh">
          {currentFriend?.photoURL && (
            <img
              width={50}
              src={currentFriend?.photoURL}
              alt="currentUserFriend"
            />
          )}
          <Box flex="1" overflow="auto">
            {chatMessages?.map(message => (
              <RowFlexBox
                mb={2}
                flexDirection={
                  currentFriend?.uid === message.senderId
                    ? 'row'
                    : 'row-reverse'
                }
                alignItems="center"
              >
                <Avatar
                  alt={
                    currentFriend?.uid === message.senderId
                      ? currentFriend.displayName
                      : currentUser?.displayName
                  }
                  src={
                    currentFriend?.uid === message.senderId
                      ? currentFriend.photoURL
                      : currentUser?.photoURL
                  }
                  sx={{width: 50, height: 50, m: 2}}
                />
                <div>{message.text}</div>
              </RowFlexBox>
            ))}
          </Box>
          <RowFlexBox>
            <TextField
              fullWidth
              rows={3}
              value={text}
              onChange={e => setText(e.target.value)}
              label="Type a message"
            />
            <button onClick={() => handleSendMessage()}>Send</button>
          </RowFlexBox>
        </ColumnFlexBox>
      </Box>
    </Box>
  )
}

export default Chat
