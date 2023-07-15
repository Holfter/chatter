import {yupResolver} from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Box,
  Divider,
  TextField as MuiTextField,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import Button from '@mui/material/Button'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {doc, getDoc, setDoc} from 'firebase/firestore'
import {Controller, useForm} from 'react-hook-form'
import Cookies from 'universal-cookie'
import * as yup from 'yup'
import {auth, db} from '../../../firebase-config'
import signInWithGoogle from '../../utils/signInWithGoogle'

const cookies = new Cookies()

const TextField = styled(MuiTextField)(() => ({
  margin: 0,
}))

const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

interface IDataRegisterForm {
  name: string
  email: string
  password: string
  confirm_password: string
}

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
}

const RegisterForm = () => {
  const {
    handleSubmit,
    control,
    formState: {errors, isSubmitting},
  } = useForm<IDataRegisterForm>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  })

  const onSubmit = async (values: IDataRegisterForm) => {
    const {email, password, name} = values
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName: name,
        lowerCaseDisplayName: name?.toLowerCase(),
        email,
        photoURL: '',
      })

      // Check if the document exists before creating a new one
      const userChatsRef = doc(db, 'userChats', res.user.uid)
      const userChatsSnapshot = await getDoc(userChatsRef)
      if (!userChatsSnapshot.exists()) {
        // This is used to keep track of the user's chat list and also
        // to show the last message below the friend's name
        await setDoc(doc(db, 'userChats', res.user.uid), {})
      }
      cookies.set('auth-token', res.user.refreshToken)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box display="flex" flexDirection="column">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" gap={2}>
          <Controller
            name="name"
            control={control}
            render={({field: {onChange}}) => (
              <TextField
                fullWidth
                variant="outlined"
                label="Name"
                type="text"
                error={Boolean(errors.name?.message)}
                helperText={
                  <Typography color="red" variant="caption" component="span">
                    {errors.name?.message}
                  </Typography>
                }
                onChange={e => onChange(e.target.value)}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({field: {onChange}}) => (
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                type="text"
                error={Boolean(errors.email?.message)}
                helperText={
                  <Typography color="red" variant="caption" component="span">
                    {errors.email?.message}
                  </Typography>
                }
                onChange={e => onChange(e.target.value)}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({field: {onChange}}) => (
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                error={Boolean(errors.password?.message)}
                helperText={
                  <Typography color="red" variant="caption" component="span">
                    {errors.password?.message}
                  </Typography>
                }
                onChange={e => onChange(e.target.value)}
              />
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            render={({field: {onChange}}) => (
              <TextField
                fullWidth
                variant="outlined"
                label="Confirm Password"
                type="password"
                error={Boolean(errors.confirm_password?.message)}
                helperText={
                  <Typography color="red" variant="caption" component="span">
                    {errors.confirm_password?.message}
                  </Typography>
                }
                onChange={e => onChange(e.target.value)}
              />
            )}
          />
          <Stack direction="row" justifyContent="flex-end">
            <Typography variant="caption">Forgot password?</Typography>
          </Stack>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            variant="contained"
          >
            Sign in
          </LoadingButton>
        </Stack>
      </form>
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

export default RegisterForm
