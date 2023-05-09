import {Box} from '@mui/material'

import {signInWithPopup} from 'firebase/auth'
import {provider, auth} from '../../../firebase-config'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const LoginForm = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      cookies.set('auth-token', result.user.refreshToken)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <button onClick={signInWithGoogle}>Sing in with Google</button>
    </Box>
  )
}

export default LoginForm
