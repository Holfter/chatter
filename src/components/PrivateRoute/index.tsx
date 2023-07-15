import {Box, CircularProgress} from '@mui/material'
import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'

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

  return currentUser ? <>{children}</> : <Navigate to="/auth" />
}

export default PrivateRoute
