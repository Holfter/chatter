import {Avatar, Box, Skeleton, Typography} from '@mui/material'

interface ChatRowSkeletonProps {
  size?: number
}

const ChatRowSkeleton = ({size = 5}: ChatRowSkeletonProps) => {
  return (
    <>
      {Array(size)
        .fill(null)
        .map(() => (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{margin: 1}}>
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            </Box>
            <Box sx={{width: '100%'}}>
              <Skeleton width="30%">
                <Typography>.</Typography>
              </Skeleton>
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            </Box>
          </Box>
        ))}
    </>
  )
}

export default ChatRowSkeleton
