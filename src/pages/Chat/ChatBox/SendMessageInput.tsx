import {Icon, IconButton, Popper, TextField, Tooltip} from '@mui/material'
import {EmojiClickData} from 'emoji-picker-react'
import {useRef, useState} from 'react'
import EmojiSelect from '../../../components/EmojiPicker'
import {useAuth} from '../../../contexts/AuthContext'
import {useChat} from '../../../contexts/ChatContext'
import {RowFlexBox} from '../../../styled_components/FlexBoxComponents'
import {sendMessage} from '../helpers/handlers'

const SendMessageInput = () => {
  const [text, setText] = useState<string>('')
  const {currentChatUser} = useChat()
  const {currentUser} = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [emojiPopoverOpen, setEmojiPopoverOpen] = useState(false)
  const id = emojiPopoverOpen ? 'emoji-popper' : undefined

  const inputRef = useRef<HTMLInputElement | null>(null)

  async function handleSendMessage() {
    setText('')
    await sendMessage({currentUser, currentFriend: currentChatUser, text})
  }

  const handleEmojiButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget)
    setEmojiPopoverOpen(prevOpen => !prevOpen)
  }

  const handleEmojiSelect = (emoji: EmojiClickData['emoji']) => {
    if (inputRef.current) {
      const currentCursorPos = inputRef.current.selectionStart || 0
      const newText =
        text.slice(0, currentCursorPos) + emoji + text.slice(currentCursorPos)
      setText(newText)

      // Calculate new cursor position after inserting emoji
      const newCursorPos = currentCursorPos + emoji.length

      // Set cursor position
      if (inputRef.current) {
        inputRef.current.selectionStart = newCursorPos
        inputRef.current.selectionEnd = newCursorPos
      }

      setEmojiPopoverOpen(false)
    }
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (emojiPopoverOpen) setEmojiPopoverOpen(false)
    setText(event.target.value)
  }

  return (
    <RowFlexBox p={2}>
      <TextField
        onKeyDown={ev => {
          if (ev.key === 'Enter') {
            ev.preventDefault()
            handleSendMessage()
          }
        }}
        type="text"
        fullWidth
        rows={3}
        inputRef={inputRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Type a message"
        InputProps={{
          endAdornment: (
            <RowFlexBox>
              <Tooltip title="Send">
                <IconButton onClick={() => handleSendMessage()}>
                  <Icon>send_icon</Icon>
                </IconButton>
              </Tooltip>
            </RowFlexBox>
          ),
          startAdornment: (
            <div>
              <IconButton onClick={e => handleEmojiButtonClick(e)}>
                <Icon>mood_icon</Icon>
              </IconButton>
              <Popper
                sx={{width: '400px', zIndex: 2}}
                id={id}
                open={emojiPopoverOpen}
                anchorEl={anchorEl}
              >
                <EmojiSelect onChange={emoji => handleEmojiSelect(emoji)} />
              </Popper>
            </div>
          ),
        }}
      />
    </RowFlexBox>
  )
}

export default SendMessageInput
