import {Box, Divider} from '@mui/material'
import {useState} from 'react'
import Avatar from '../../../components/ImagesDisplay/Avatar'
import TextInput from '../../../components/Inputs/TextInput'
import ChatRowSkeleton from '../../../components/Skeletons/Chat/ChatRowSkeleton'
import {useChat} from '../../../contexts/ChatContext'
import useQueryUsers from '../../../hooks/useQueryUsers'
import {ChatRow} from '../styles'

const SearchUserInput = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const {setCurrentChatUser} = useChat()

  const {users, status: isSearchingUsers} = useQueryUsers(searchInput)

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value?.toLowerCase())
  }

  return (
    <>
      <TextInput
        sx={{m: 0, mb: 2}}
        onChange={handleSearchUser}
        value={searchInput}
        type="text"
        label="Search or start new chat"
      />
      {isSearchingUsers === 'pending' && (
        <Box mb={2}>
          <ChatRowSkeleton size={3} />
          <Divider />
        </Box>
      )}
      {users && (
        <Box>
          {users.map(user => (
            <ChatRow onClick={() => setCurrentChatUser(user)}>
              <Avatar src={user.photoURL} alt={user.displayName} />
              <div>{user.displayName}</div>
            </ChatRow>
          ))}
          <Divider />
        </Box>
      )}
    </>
  )
}

export default SearchUserInput
