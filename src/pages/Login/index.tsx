import {Box, Container, CssBaseline, Paper, Typography} from '@mui/material'
import LoginForm from '../../components/Forms/LoginForm'

const Login = () => {
  return (
    <div>
      <CssBaseline />
      <Box
        component="main"
        height="100vh"
        display="flex"
        justifyContent="space-between"
        overflow="hidden"
      >
        <Box
          ml={5}
          width="50%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <h1>gCHAT</h1>
          <Typography variant="h3">
            Say hello to your new favorite chat app.
          </Typography>
          <img src="/assets/images/login-vector.png" width="700px" alt="" />
        </Box>
        <Box
          width="50%"
          sx={{
            p: 4,
            height: '100%',
            background: 'primary.main',
          }}
        >
          <LoginForm />
        </Box>
      </Box>
    </div>
  )
}

export default Login
