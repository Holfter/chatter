import {Box, BoxProps, styled} from '@mui/material'

interface ImageProps extends BoxProps {
  src: string
  alt: string
  width: number | string
  height?: number | string
  rounded?: boolean
}

export const ImageCompoment = styled('img')<ImageProps>(({rounded}) => ({
  borderRadius: rounded ? 5 : 0,
}))

const Image = ({src, alt, width, height, rounded, ...props}: ImageProps) => {
  return (
    <Box {...props}>
      <ImageCompoment
        width={width}
        height={height}
        src={src}
        alt={alt}
        rounded={rounded}
      />
    </Box>
  )
}

export default Image
