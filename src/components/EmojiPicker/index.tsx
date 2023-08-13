import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from 'emoji-picker-react'
import {memo} from 'react'

interface EmojiSelectProps {
  onChange?: (emoji: EmojiClickData['emoji']) => void
}

const theme =
  localStorage.getItem('colorMode') === 'dark' ? Theme.DARK : Theme.LIGHT

const EmojiSelect = memo(function ({onChange}: EmojiSelectProps) {
  const onEmojiClick = (emojiData: EmojiClickData) => {
    onChange && onChange(emojiData.emoji)
  }

  return (
    <EmojiPicker
      onEmojiClick={onEmojiClick}
      autoFocusSearch={false}
      theme={theme}
      width="100%"
      lazyLoadEmojis={true}
      emojiStyle={EmojiStyle.NATIVE}
    />
  )
})

export default EmojiSelect
