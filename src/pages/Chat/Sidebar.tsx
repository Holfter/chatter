import {useState} from 'react'
import {Box} from '@mui/material'
import {styled} from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import {IUser} from '../../types/IUser'
import useQueryUsers from '../../hooks/useQueryUsers'
import useUserChats from '../../hooks/useUserChats'

const ChatSidebar = styled(Box)(({theme}) => ({
  width: 300,
  height: '100vh',
  borderRight: `1px solid ${theme.palette.divider}`,
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

interface SidebarProps {
  onChange?: () => void
  onUserSelect: (user: IUser) => void
}

const Sidebar = ({onUserSelect}: SidebarProps) => {
  const [searchInput, setSearchInput] = useState<string>('')
  const {users} = useQueryUsers(searchInput)
  const {userChats} = useUserChats()

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value?.toLowerCase())
  }
  return (
    <ChatSidebar>
      <TextField
        sx={{mb: 2}}
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
                onClick={() => onUserSelect(user)}
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
                onClick={() => onUserSelect(chat[1].userInfo)}
                alt={chat[1].userInfo?.displayName}
                src={chat[1].userInfo?.photoURL}
                sx={{width: 50, height: 50, mr: 2}}
              />
              <ColumnFlexBox>
                <span>{chat[1].userInfo?.displayName}</span>
                <span>{chat[1].lastMessage?.text}</span>
              </ColumnFlexBox>
            </RowFlexBox>
          ))}
        </div>
      </ColumnFlexBox>
    </ChatSidebar>
  )
}

export default Sidebar
