import {
  Box,
  Icon,
  IconButton,
  Paper,
  Popper,
  Tooltip,
  Typography,
} from '@mui/material'
import {EmojiClickData} from 'emoji-picker-react'
import {useCallback, useRef, useState} from 'react'
import FileImportButton from '../../../components/Buttons/FileImportButton'
import EmojiSelect from '../../../components/EmojiPicker'
import Image from '../../../components/ImagesDisplay/Image'
import TextInput from '../../../components/Inputs/TextInput'
import {useAuth} from '../../../contexts/AuthContext'
import {useChat} from '../../../contexts/ChatContext'
import isDownScreenSize from '../../../hooks/isDownScreenSize'
import {
  ColumnFlexBox,
  RowFlexBox,
} from '../../../styled_components/FlexBoxComponents'
import {sendMessage} from '../helpers/handlers'

const SendMessageInput = () => {
  const [text, setText] = useState<string>('')
  const {currentChatUser} = useChat()
  const {currentUser} = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>()

  const [emojiPopoverOpen, setEmojiPopoverOpen] = useState(false)
  const id = emojiPopoverOpen ? 'emoji-popper' : undefined

  const inputRef = useRef<HTMLInputElement | null>(null)

  // Returns true if the screen size is down 900px
  const isDownMd = isDownScreenSize('md')

  async function handleSendMessage() {
    if (!!text.length || file) {
      await sendMessage({
        currentUser,
        currentFriend: currentChatUser,
        text: inputRef?.current?.value || text,
        file,
      })
      setText('')
      setFile(null)
    }
  }

  const handleEmojiButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget)
    setEmojiPopoverOpen(prevOpen => !prevOpen)
  }

  const closeEmojiPicker = () => setEmojiPopoverOpen(false)

  const handleEmojiSelect = useCallback((emoji: EmojiClickData['emoji']) => {
    if (inputRef.current) {
      const prevInputValue = inputRef.current.value
      const currentCursorPos = inputRef.current.selectionStart || 0
      const newText =
        prevInputValue.slice(0, currentCursorPos) +
        emoji +
        prevInputValue.slice(currentCursorPos)
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
  }, [])

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleFileImportChange = (file: File, preview?: string | null) => {
    closeEmojiPicker()
    setFilePreview(preview)
    setFile(file)
  }

  return (
    <ColumnFlexBox>
      {file && (
        <>
          <Box p={2}>
            <RowFlexBox
              p={2}
              alignItems="center"
              justifyContent="space-between"
              gap={1}
              component={Paper}
            >
              <RowFlexBox alignItems="center" gap={2}>
                {filePreview ? (
                  <Image
                    src={filePreview || ''}
                    alt="File preview"
                    width={80}
                  />
                ) : (
                  <Icon>insert_drive_file_icon</Icon>
                )}
                <Typography variant="body1">{file.name}</Typography>
              </RowFlexBox>
              <IconButton
                onClick={() => {
                  setFile(null)
                  setFilePreview(null)
                }}
                aria-label="remove-file"
                size="small"
              >
                <Icon>close_icon</Icon>
              </IconButton>
            </RowFlexBox>
          </Box>
        </>
      )}
      <RowFlexBox p={2}>
        <TextInput
          key={JSON.stringify(file)}
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
            startAdornment: (
              <RowFlexBox>
                <Box>
                  <IconButton onClick={e => handleEmojiButtonClick(e)}>
                    <Icon>mood_icon</Icon>
                  </IconButton>
                  <Popper
                    sx={{
                      width: {xs: '100%', md: '400px', lg: '400px'},
                      zIndex: 9999,
                      p: 2,
                    }}
                    id={id}
                    open={emojiPopoverOpen && !isDownMd}
                    anchorEl={anchorEl}
                    placement="top-start"
                  >
                    <EmojiSelect onChange={handleEmojiSelect} />
                  </Popper>
                </Box>
                <FileImportButton
                  onChange={(file, preview) =>
                    handleFileImportChange(file, preview)
                  }
                />
              </RowFlexBox>
            ),
            endAdornment: (
              <RowFlexBox>
                <Tooltip title="Send">
                  <IconButton onClick={() => handleSendMessage()}>
                    <Icon>send_icon</Icon>
                  </IconButton>
                </Tooltip>
              </RowFlexBox>
            ),
          }}
        />
      </RowFlexBox>

      {emojiPopoverOpen && isDownMd && (
        <EmojiSelect onChange={handleEmojiSelect} />
      )}
    </ColumnFlexBox>
  )
}

export default SendMessageInput
