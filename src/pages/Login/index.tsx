import {Box, Container, CssBaseline, Paper} from '@mui/material'
import LoginForm from '../../components/Forms/LoginForm'

const Login = () => {
  return (
    <Container>
      <CssBaseline />
      <Box
        component="main"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper sx={{p: 2}}>
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
