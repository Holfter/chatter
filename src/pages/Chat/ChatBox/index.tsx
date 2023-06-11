import {useEffect, useRef, useState} from 'react'
import {Box, Icon, IconButton, Tooltip, Typography} from '@mui/material'
import {styled} from '@mui/material/styles'
import {IUser} from '../../../types/IUser'
import {useAuth} from '../../../contexts/AuthContext'
import {sendMessage} from '../helpers/handlers'
import useChatMessages from '../../../hooks/useChatMessages'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import ChatBoxHeader from './ChatBoxHeader'

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
    <Box width="100%" height="100%">
      <ColumnFlexBox height="100%">
        <ChatBoxHeader currentFriend={currentFriend} />
        <Box flex="1" overflow="auto" ref={chatBoxRef}>
          {chatMessages?.map(message => {
            const isCurrentUserTheSender =
              currentFriend?.uid === message?.senderId

            const displayName = isCurrentUserTheSender
              ? currentFriend?.displayName
              : currentUser?.displayName

            const direction = isCurrentUserTheSender ? 'row' : 'row-reverse'

            const photoURL = isCurrentUserTheSender
              ? currentFriend?.photoURL
              : currentUser?.photoURL

            const borderRadius =
              direction === 'row' ? '0px 19px 19px 19px' : '19px 0px 19px 19px'

            return (
              <RowFlexBox
                key={message.id}
                mb={2}
                flexDirection={direction}
                alignItems="center"
              >
                <Avatar
                  alt={displayName}
                  src={photoURL}
                  sx={{width: 50, height: 50, m: 2}}
                />
                <Box>
                  <Typography
                    sx={{textAlign: direction === 'row' ? 'start' : 'end'}}
                    mt={6}
                    color="GrayText"
                  >
                    {displayName}
                  </Typography>
                  <Box
                    sx={{
                      background: '#f5f7fb',
                      padding: '8px 16px',
                      borderRadius: borderRadius,
                    }}
                  >
                    <Typography>{message?.text}</Typography>
                  </Box>
                </Box>
              </RowFlexBox>
            )
          })}
        </Box>
        <RowFlexBox>
          <TextField
            onKeyDown={ev => {
              if (ev.key === 'Enter') {
                ev.preventDefault()
                handleSendMessage()
              }
            }}
            fullWidth
            rows={3}
            value={text}
            onChange={e => setText(e.target.value)}
            label="Type a message"
            InputProps={{
              endAdornment: (
                <Tooltip title="Send">
                  <IconButton onClick={() => handleSendMessage()}>
                    <Icon>send_icon</Icon>
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </RowFlexBox>
      </ColumnFlexBox>
    </Box>
  )
}

export default ChatBox
