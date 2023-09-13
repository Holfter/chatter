import {Box, Skeleton} from '@mui/material'
import {useState} from 'react'
import {useInView} from 'react-intersection-observer'

interface ImageProps {
  src: string
  alt: string
  maxWidth?: string | number
}

const LazyImage = ({src, alt, maxWidth = 300}: ImageProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Load the image only once
    rootMargin: '200px 0px', // Adjust the margin as needed
  })

  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <Box maxWidth={maxWidth}>
      {inView && !imageLoaded && (
        <Skeleton
          variant="rounded"
          width="300px"
          height="300px"
          animation="wave"
        />
      )}
      <img
        ref={ref}
        src={inView ? src : ''}
        alt={alt}
        loading="lazy"
        onLoad={handleImageLoad}
        style={{
          opacity: imageLoaded ? 1 : 0,
          width: '100%',
          borderRadius: '12px',
        }}
      />
    </Box>
  )
}

export default LazyImage
