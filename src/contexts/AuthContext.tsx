import React, {createContext, useContext} from 'react'
import {User} from 'firebase/auth'
import useAuthObserver from '../hooks/useAuthObserver'

type UserType = User | null | undefined

interface AuthContextValue {
  currentUser: UserType
  loading: boolean
}

const initialValues = {
  currentUser: null,
  loading: true,
}

const AuthContext = createContext<AuthContextValue | null>(initialValues)

interface Props {
  children: React.ReactNode
}

export const AuthProvider = ({children}: Props) => {
  const {currentUser, loading} = useAuthObserver()

  return (
    <AuthContext.Provider value={{currentUser, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error(
      'useAuth may only be used from within a (child of a) AuthProvider.',
    )
  return context
}
