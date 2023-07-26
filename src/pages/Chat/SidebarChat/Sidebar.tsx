import {useChat} from '../../../contexts/ChatContext'
import {ColumnFlexBox} from '../../../styled_components/FlexBoxComponents'
import {ChatSidebar} from '../styles'
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
