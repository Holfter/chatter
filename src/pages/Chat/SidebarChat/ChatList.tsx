import {Avatar, Box, Typography} from '@mui/material'
import ChatRowSkeleton from '../../../components/Skeletons/Chat/ChatRowSkeleton'
import {useChat} from '../../../contexts/ChatContext'
import useUserChats from '../../../hooks/useUserChats'
import {ColumnFlexBox} from '../../../styled_components/FlexBoxComponents'
import {EllipsisTypography} from '../../../styled_components/Typographys'
import {ChatRow} from '../styles'

const ChatList = () => {
  const {userChats, loading: isLoadingChatList} = useUserChats()
  const {setCurrentChatUser} = useChat()

  return (
    <Box>
      {isLoadingChatList ? (
        <ChatRowSkeleton size={6} />
      ) : (
        <>
          {Object.entries(userChats)?.map(chat => (
            <ChatRow
              width={200}
              mb={2}
              key={chat[0]}
              onClick={() => setCurrentChatUser(chat[1].userInfo)}
            >
              <Avatar
                alt={chat[1].userInfo?.displayName}
                src={chat[1].userInfo?.photoURL}
                sx={{width: 50, height: 50, mr: 2}}
              />
              <ColumnFlexBox
                width="100%"
                sx={{
                  overflow: 'hidden',
                }}
              >
                <Typography variant="body1">
                  {chat[1].userInfo?.displayName}
                </Typography>
                <EllipsisTypography variant="body2" color="text_color.soft">
                  {chat[1].lastMessage?.text}
                </EllipsisTypography>
              </ColumnFlexBox>
            </ChatRow>
          ))}
        </>
      )}
    </Box>
  )
}

export default ChatList
