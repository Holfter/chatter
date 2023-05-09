import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const RegisterForm = () => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  })
  console.log('Errors ❌', errors)

  const onSubmit = (data: any) => console.log(data)
  return (
    <form>
      <Controller
        name="name"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextField
            size="small"
            onChange={onChange}
            value={value}
            label="Name"
            error={Boolean(errors?.name)}
            helperText={errors?.name?.message as string}
          />
        )}
      />
      <TextField size="small" placeholder="E-mail" />
      <TextField size="small" placeholder="Password" />
      <Button
        type="submit"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        Register
      </Button>
    </form>
  )
}

export default RegisterForm
