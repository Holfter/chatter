import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Typography,
  Grid,
} from '@mui/material'
import LoginForm from '../../components/Forms/LoginForm'

const Login = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage:
          'linear-gradient(to right bottom, #daecf2, #e5f0f7, #f0f4fa, #f8f9fd, #ffffff);',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: '1fr',
        gridColumnGap: '0px',
        gridRowGap: '0px',
      }}
    >
      <CssBaseline />

      <Grid container xs={12} justifyContent="center" sx={{padding: '12px'}}>
        <Grid item xs={7}>
          <Box mb={4}>
            <Grid item xs={7}>
              <Box display="flex" mb={9}>
                <Box
                  sx={{
                    background: 'black',
                    color: 'white',
                    fontSize: '2rem',
                    padding: '2px 8px',
                  }}
                >
                  <Typography variant="h5">gCHAT</Typography>
                </Box>
              </Box>
            </Grid>
            <Typography variant="h4" mb={2} sx={{display: 'flex'}}>
              Welcome to gCHAT
            </Typography>
            <Typography variant="body2">
              Please enter log in details below
            </Typography>
          </Box>

          <LoginForm />
        </Grid>
      </Grid>
      <Box height="100%">
        <Paper
          elevation={0}
          sx={{
            backgroundImage: 'url(/assets/images/login-illustration.jpg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100%',
          }}
        ></Paper>
      </Box>
    </Box>
  )
}

export default Login
