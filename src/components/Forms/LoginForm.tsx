import {Box, Button, TextField, Divider, Typography, Stack} from '@mui/material'

import {signInWithPopup} from 'firebase/auth'
import {provider, auth, db} from '../../../firebase-config'
import Cookies from 'universal-cookie'
import {useNavigate} from 'react-router-dom'
import {doc, setDoc} from 'firebase/firestore'

const cookies = new Cookies()

const LoginForm = () => {
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider)

      const {displayName, email} = res.user

      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      })

      //create empty user chats on firestore
      await setDoc(doc(db, 'userChats', res.user.uid), {})
      cookies.set('auth-token', res.user.refreshToken)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Stack direction="column" spacing={2}>
        <TextField fullWidth variant="outlined" label="User" type="text" />
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
        />
        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="caption">Forgot password?</Typography>
        </Stack>
      </Stack>
      <Button variant="contained" color="secondary">
        Sign in
      </Button>
      <Divider>
        <Typography variant="caption">or continue</Typography>
      </Divider>
      <Button
        variant="outlined"
        color="primary"
        onClick={signInWithGoogle}
        startIcon={
          <img
            src="/assets/images/google-icon.png"
            alt="google-icon"
            width="18"
          />
        }
      >
        Log in with Google
      </Button>
      <Stack direction="row" justifyContent="center">
        <Typography variant="caption">
          Don't have an account?. Sign up
        </Typography>
      </Stack>
    </Box>
  )
}

export default LoginForm
