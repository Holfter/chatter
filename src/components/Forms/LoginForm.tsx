import {Box, Button, Divider, Stack, TextField, Typography} from '@mui/material'
import signInWithGoogle from '../../utils/signInWithGoogle'

const LoginForm = () => {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Stack direction="column">
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
      <Button variant="contained">Sign in</Button>
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
