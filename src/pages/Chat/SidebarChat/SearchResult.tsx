import {useState} from 'react'
import TextInput from '../../../components/Inputs/TextInput'
import {useChat} from '../../../contexts/ChatContext'
import useQueryUsers from '../../../hooks/useQueryUsers'
import {ChatRow} from '../styles'

const SearchUserInput = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const {setCurrentChatUser} = useChat()

  const {users} = useQueryUsers(searchInput)

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
      {users &&
        users.map(user => (
          <ChatRow>
            <img
              onClick={() => setCurrentChatUser(user)}
              width={50}
              src={user.photoURL}
              alt={user.displayName}
            />
            <div>{user.displayName}</div>
          </ChatRow>
        ))}
    </>
  )
}

export default SearchUserInput
