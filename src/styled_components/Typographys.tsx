import {Typography, styled} from '@mui/material'

export const EllipsisTypography = styled(Typography)(() => ({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}))
