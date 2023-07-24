import {Avatar, Box, Skeleton, Typography} from '@mui/material'

const ChatMessagesSkeleton = () => {
  return (
    <Box>
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            }}
          >
            <Box sx={{margin: 1}}>
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            </Box>
            <Box
              mt={2}
              display="flex"
              flexDirection="column"
              alignItems={index % 2 === 0 ? 'flex-start' : 'flex-end'}
            >
              <Skeleton width="30%">
                <Typography>.</Typography>
              </Skeleton>
              <Skeleton
                variant="rounded"
                width={Math.floor(Math.random() * (400 - 200 + 1)) + 210}
                height={60}
              />
            </Box>
          </Box>
        ))}
    </Box>
  )
}

export default ChatMessagesSkeleton
