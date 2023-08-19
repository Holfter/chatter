import {AvatarProps, Avatar as MUIAvatar} from '@mui/material'

const Avatar = (props: AvatarProps) => {
  return <MUIAvatar {...props} sx={{width: 50, height: 50, mr: 2}} />
}

export default Avatar
