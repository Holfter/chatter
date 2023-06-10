import {useEffect, useRef, useState} from 'react'
import {Box} from '@mui/material'
import {styled} from '@mui/material/styles'
import {IUser} from '../../types/IUser'
import {useAuth} from '../../contexts/AuthContext'
import {sendMessage} from './helpers/handlers'
import useChatMessages from '../../hooks/useChatMessages'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'

const ColumnFlexBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

const RowFlexBox = styled(Box)(() => ({
  display: 'flex',
}))

interface ChatBoxProps {
  currentFriend: IUser | null
}

const ChatBox = ({currentFriend}: ChatBoxProps) => {
  const [text, setText] = useState<string>('')
  const {chatMessages} = useChatMessages(currentFriend)
  const {currentUser} = useAuth()

  const chatBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to the bottom of the chat box
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [chatMessages])

  async function handleSendMessage() {
    setText('')
    await sendMessage({currentUser, currentFriend, text})
  }
  return (
    <Box width="100%">
      <ColumnFlexBox height="100vh">
        {currentFriend?.photoURL && (
          <img
            width={50}
            src={currentFriend?.photoURL}
            alt="currentUserFriend"
          />
        )}
        <Box flex="1" overflow="auto" ref={chatBoxRef}>
          {chatMessages?.map(message => (
            <RowFlexBox
              mb={2}
              flexDirection={
                currentFriend?.uid === message.senderId ? 'row' : 'row-reverse'
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
  )
}

export default ChatBox
