import {Icon, IconButton, TextField, Tooltip} from '@mui/material'
import {useState} from 'react'
import {useAuth} from '../../../contexts/AuthContext'
import {useChat} from '../../../contexts/ChatContext'
import {RowFlexBox} from '../../../styled_components/FlexBoxComponents'
import {sendMessage} from '../helpers/handlers'

const SendMessageInput = () => {
  const [text, setText] = useState<string>('')
  const {currentChatUser} = useChat()
  const {currentUser} = useAuth()

  async function handleSendMessage() {
    setText('')
    await sendMessage({currentUser, currentFriend: currentChatUser, text})
  }
  return (
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
  )
}

export default SendMessageInput
