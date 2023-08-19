import {Icon, IconButton, styled} from '@mui/material'
import {useRef} from 'react'

const FileInput = styled('input')(() => ({
  display: 'none',
}))

interface FileImportButtonProps {
  onChange?: (file: File) => void
}

const FileImportButton = ({onChange}: FileImportButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImportClick = () => {
    fileInputRef?.current && fileInputRef.current.click()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event?.target?.files?.[0]
    if (selectedFile) {
      onChange && onChange(selectedFile)
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
