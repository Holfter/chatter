import React from 'react'
import {useAuth} from '../../contexts/AuthContext'
import {Navigate} from 'react-router-dom'
import {Box, CircularProgress, Stack} from '@mui/material'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
  const {currentUser, loading} = useAuth()

  if (loading)
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="primary" />
      </Box>
    )

  return currentUser ? <>{children}</> : <Navigate to="/login" />
}

export default PrivateRoute
