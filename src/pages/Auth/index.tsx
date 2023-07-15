import {
  Box,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {useState} from 'react'
import LoginForm from '../../components/Forms/LoginForm'
import RegisterForm from '../../components/Forms/RegisterForm'

const ResponsiveBox = styled(Box)(({theme}) => ({
  height: '100vh',
  backgroundImage:
    'linear-gradient(to right bottom, #daecf2, #e5f0f7, #f0f4fa, #f8f9fd, #ffffff);',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: '1fr',
  gridColumnGap: '0px',
  gridRowGap: '0px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
  },
}))

const Auth = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.up('md'))
  const [currentForm, setCurrentForm] = useState('register')

  const form = currentForm === 'register' ? <RegisterForm /> : <LoginForm />
  return (
    <ResponsiveBox>
      <CssBaseline />

      <Grid
        container
        xs={12}
        justifyContent="space-evenly"
        sx={{padding: '12px'}}
      >
        <Grid item xs={12} md={7} sm={10}>
          <Box display="flex" mb={9}>
            <Box
              sx={{
                background: 'black',
                color: 'white',
                fontSize: '2rem',
                padding: '2px 8px',
              }}
            >
              <Typography variant="h5">Chatter</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} sm={10}>
          <Box mb={4}>
            <Typography variant="h4" mb={2} sx={{display: 'flex'}}>
              {currentForm === 'login'
                ? 'Welcome to Chatter'
                : 'Create your account'}
            </Typography>
            <Typography variant="body2">
              Please enter log in details below
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} sm={10}>
          {form}
        </Grid>
      </Grid>
      {isMobile && (
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
          />
        </Box>
      )}
    </ResponsiveBox>
  )
}

export default Auth
