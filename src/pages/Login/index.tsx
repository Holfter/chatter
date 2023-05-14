import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Typography,
  Grid,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import LoginForm from '../../components/Forms/LoginForm'

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

const Login = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.up('md'))
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
              <Typography variant="h5">gCHAT</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} sm={10}>
          <Box mb={4}>
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
          ></Paper>
        </Box>
      )}
    </ResponsiveBox>
  )
}

export default Login
