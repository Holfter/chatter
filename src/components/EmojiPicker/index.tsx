import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from 'emoji-picker-react'

interface EmojiSelect {
  onChange: (emoji: EmojiClickData['emoji']) => void
}

const theme =
  localStorage.getItem('colorMode') === 'dark' ? Theme.DARK : Theme.LIGHT

const EmojiSelect = ({onChange}: EmojiSelect) => {
  const onEmojiClick = (emojiData: EmojiClickData) => {
    onChange(emojiData.emoji)
  }

  return (
    <div>
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        autoFocusSearch={false}
        theme={theme}
        // searchDisabled
        // skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
        // height={350}
        width="100%"
        // emojiVersion="0.6"
        // lazyLoadEmojis={true}
        // previewConfig={{
        //   defaultCaption: "Pick one!",
        //   defaultEmoji: "1f92a" // 🤪
        // }}
        // suggestedEmojisMode={SuggestionMode.RECENT}
        // skinTonesDisabled
        // searchPlaceHolder="Filter"
        // defaultSkinTone={SkinTones.MEDIUM}
        emojiStyle={EmojiStyle.NATIVE}
        // categories={[
        //   {
        //     name: "Fun and Games",
        //     category: Categories.ACTIVITIES
        //   },
        //   {
        //     name: "Smiles & Emotions",
        //     category: Categories.SMILEYS_PEOPLE
        //   },
        //   {
        //     name: "Flags",
        //     category: Categories.FLAGS
        //   },
        //   {
        //     name: "Yum Yum",
        //     category: Categories.FOOD_DRINK
        //   }
        // ]}
      />
    </div>
  )
}

export default EmojiSelect
