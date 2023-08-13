import {TextField, TextFieldProps} from '@mui/material'
import isDownScreenSize from '../../hooks/isDownScreenSize'

const TextInput = (props: TextFieldProps) => {
  const isDownMd = isDownScreenSize('md')
  return <TextField {...props} size={isDownMd ? 'small' : 'medium'} />
}

export default TextInput
