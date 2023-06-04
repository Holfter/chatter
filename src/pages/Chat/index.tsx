import {useState, useEffect} from 'react'
import {Box} from '@mui/material'
import {styled} from '@mui/material/styles'
import {IUser, UserChat} from '../../types/IUser'
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import {db} from '../../../firebase-config'
import {useAuth} from '../../contexts/AuthContext'
import {sendMessage} from './helpers/handlers'
import useQueryUsers from '../../hooks/useQueryUsers'
import useUserChats from '../../hooks/useUserChats'
import {Message} from '../../types/IChat'
import useChatMessages from '../../hooks/useChatMessages'

const ChatSidebar = styled(Box)(() => ({
  width: 300,
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
        <input
          onChange={handleSearchUser}
          value={searchInput}
          type="text"
          placeholder="Search or start new chat"
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
          <div>Current Chats</div>
          <div>
            {Object.entries(userChats)?.map(chat => (
              <RowFlexBox
                className="userChat"
                key={chat[0]}
                //onClick={() => handleSelect(chat[1].userInfo)}
              >
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                  <span>{chat[1].userInfo.displayName}</span>
                  <p>{chat[1].lastMessage?.text}</p>
                </div>
              </RowFlexBox>
            ))}
          </div>
        </ColumnFlexBox>
      </ChatSidebar>
      <Box>
        {currentFriend?.photoURL && (
          <img
            width={50}
            src={currentFriend?.photoURL}
            alt="currentUserFriend"
          />
        )}
        {chatMessages?.map(message => (
          <div>{message.text}</div>
        ))}
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="type something"
          name=""
          id=""
          cols={30}
          rows={10}
        />
        <button onClick={() => handleSendMessage()}>Send</button>
      </Box>
    </Box>
  )
}

export default Chat
