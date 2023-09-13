import {Avatar, Box, Paper, Typography} from '@mui/material'
import {styled} from '@mui/material/styles'
import {useEffect, useRef} from 'react'
import LazyImage from '../../../components/ImagesDisplay/LazyImage'
import {useAuth} from '../../../contexts/AuthContext'
import {useChat} from '../../../contexts/ChatContext'
import useChatMessages from '../../../hooks/useChatMessages'
import {ColumnFlexBox} from '../../../styled_components/FlexBoxComponents'
import {Message} from '../../../types/IChat'

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

  const isCurrentUserTheSender = (message: Message) =>
    currentChatUser?.uid === message?.senderId

  const getMessageDisplayName = (message: Message) =>
    isCurrentUserTheSender(message)
      ? currentChatUser?.displayName
      : currentUser?.displayName

  const getMessageDirection = (message: Message) =>
    isCurrentUserTheSender(message) ? 'row' : 'row-reverse'

  const getMessagePhotoURL = (message: Message) =>
    isCurrentUserTheSender(message)
      ? currentChatUser?.photoURL
      : currentUser?.photoURL

  const getMessageBorderRadius = (message: Message) =>
    getMessageDirection(message) === 'row'
      ? '0px 19px 19px 19px'
      : '19px 0px 19px 19px'

  const getMessageMargin = (message: Message) =>
    getMessageDirection(message) === 'row' ? '0 0 0 3rem' : '0 3rem 0 0'

  return (
    <Box flex="1" overflow="auto" ref={chatBoxRef}>
      {chatMessages?.map(message => {
        const displayName = getMessageDisplayName(message)
        const direction = getMessageDirection(message)
        const photoURL = getMessagePhotoURL(message)
        const borderRadius = getMessageBorderRadius(message)
        const messageContainerMargin = getMessageMargin(message)
        const responsiveDirection = direction === 'row' ? 'start' : 'end'

        return (
          <ColumnFlexBox key={message.id} p={2}>
            <RowFlexBox flexDirection={direction} alignItems="center" gap={2}>
              <Avatar
                alt={displayName}
                src={photoURL}
                sx={{width: 50, height: 50}}
              />
              <Typography
                sx={{textAlign: responsiveDirection}}
                color="GrayText"
              >
                {displayName}
              </Typography>
            </RowFlexBox>
            <ColumnFlexBox
              sx={{
                alignItems: responsiveDirection,
                margin: messageContainerMargin,
              }}
            >
              <Box maxWidth={{xs: '90%', md: '65%', lg: '55%'}}>
                <Box
                  width="100%"
                  component={Paper}
                  sx={{
                    padding: '16px',
                    borderRadius: borderRadius,
                  }}
                >
                  {message?.file && (
                    <LazyImage src={message?.file} alt="image" />
                  )}
                  <Typography>{message?.text}</Typography>
                </Box>
              </Box>
            </ColumnFlexBox>
          </ColumnFlexBox>
        )
      })}
    </Box>
  )
}

export default ChatMessages
