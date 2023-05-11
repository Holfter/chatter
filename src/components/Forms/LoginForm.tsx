import {Box, Button} from '@mui/material'

import {signInWithPopup} from 'firebase/auth'
import {provider, auth} from '../../../firebase-config'
import Cookies from 'universal-cookie'
import {useNavigate} from 'react-router-dom'

const cookies = new Cookies()

const LoginForm = () => {
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      cookies.set('auth-token', result.user.refreshToken)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Button variant="contained" color="primary" onClick={signInWithGoogle}>
        Sing in with Google
      </Button>
    </Box>
  )
}

export default LoginForm
