import {Breakpoint, Theme, useMediaQuery} from '@mui/material'

const isDownScreenSize = (size: Breakpoint | number) => {
  const isDown = useMediaQuery((theme: Theme) => theme.breakpoints.down(size))

  return isDown
}

export default isDownScreenSize
