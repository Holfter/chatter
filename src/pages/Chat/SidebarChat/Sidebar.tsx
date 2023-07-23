import {useChat} from '../../../contexts/ChatContext'
import {ChatSidebar, ColumnFlexBox} from '../styles'
import ChatList from './ChatList'
import SearchUserInput from './SearchResult'

const Sidebar = () => {
  const {currentChatUser} = useChat()

  return (
    <ChatSidebar isChatActive={Boolean(currentChatUser)}>
      <ColumnFlexBox>
        <SearchUserInput />
        <ChatList />
      </ColumnFlexBox>
    </ChatSidebar>
  )
}

export default Sidebar
