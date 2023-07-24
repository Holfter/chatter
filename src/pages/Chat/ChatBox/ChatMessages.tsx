import {Avatar, Box, Paper, Typography} from '@mui/material'
import {styled} from '@mui/material/styles'
import {useEffect, useRef} from 'react'
import {useAuth} from '../../../contexts/AuthContext'
import {useChat} from '../../../contexts/ChatContext'
import useChatMessages from '../../../hooks/useChatMessages'

const RowFlexBox = styled(Box)(() => ({
  display: 'flex',
}))

const ChatMessages = () => {
  const {currentChatUser} = useChat()
  const {chatMessages} = useChatMessages(currentChatUser)
  const {currentUser} = useAuth()

  const chatBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to the bottom of the chat box
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [chatMessages])

  return (
    <Box flex="1" overflow="auto" ref={chatBoxRef}>
      {chatMessages?.map(message => {
        const isCurrentUserTheSender =
          currentChatUser?.uid === message?.senderId

        const displayName = isCurrentUserTheSender
          ? currentChatUser?.displayName
          : currentUser?.displayName

        const direction = isCurrentUserTheSender ? 'row' : 'row-reverse'

        const photoURL = isCurrentUserTheSender
          ? currentChatUser?.photoURL
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
            <Box maxWidth="65%">
              <Typography
                sx={{textAlign: direction === 'row' ? 'start' : 'end'}}
                mt={6}
                color="GrayText"
              >
                {displayName}
              </Typography>
              <Box
                component={Paper}
                sx={{
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
  )
}

export default ChatMessages
