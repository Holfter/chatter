import {Icon, IconButton, styled} from '@mui/material'
import {useRef} from 'react'

const FileInput = styled('input')(() => ({
  display: 'none',
}))

interface FileImportButtonProps {
  onChange?: (file: File, preview?: string | null) => void
}

const FileImportButton = ({onChange}: FileImportButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImportClick = () => {
    fileInputRef?.current && fileInputRef.current.click()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event?.target?.files?.[0]
    if (selectedFile) {
      let preview = null
      if (selectedFile.type.startsWith('image/')) {
        preview = URL.createObjectURL(selectedFile)
      }
      onChange && onChange(selectedFile, preview)
    }
  }

  return (
    <div>
      <FileInput type="file" ref={fileInputRef} onChange={handleFileSelect} />
      <IconButton onClick={handleImportClick}>
        <Icon sx={{transform: 'rotate(-45deg)'}}>attachment_file</Icon>
      </IconButton>
    </div>
  )
}

export default FileImportButton
