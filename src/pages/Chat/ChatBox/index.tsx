import {Box} from '@mui/material'
import ChatMessagesSkeleton from '../../../components/Skeletons/Chat/ChatMessagesSkeleton'
import useChatMessages from '../../../hooks/useChatMessages'
import {ColumnFlexBox} from '../../../styled_components/FlexBoxComponents'
import {IUser} from '../../../types/IUser'
import ChatBoxHeader from './ChatBoxHeader'
import ChatMessages from './ChatMessages'
import SendMessageInput from './SendMessageInput'

interface ChatBoxProps {
  currentFriend: IUser | null
}

const ChatBox = ({currentFriend}: ChatBoxProps) => {
  const {loading: isLoadingMessages} = useChatMessages(currentFriend)
  return (
    <Box width="100%" height="100%">
      <ColumnFlexBox height="100%">
        <ChatBoxHeader currentFriend={currentFriend} />
        {isLoadingMessages ? <ChatMessagesSkeleton /> : <ChatMessages />}
        <SendMessageInput />
      </ColumnFlexBox>
    </Box>
  )
}

export default ChatBox
