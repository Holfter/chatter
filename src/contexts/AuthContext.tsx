import React, {createContext, useEffect, useState, useContext} from 'react'
import {auth} from '../../firebase-config'
import {User, onAuthStateChanged} from 'firebase/auth'

type UserType = User | null | undefined

interface AuthContextValue {
  currentUser: UserType
}

const AuthContext = createContext<AuthContextValue | null>({currentUser: null})

interface Props {
  children: React.ReactNode
}

export const AuthProvider = ({children}: Props) => {
  const [currentUser, setCurrentUser] = useState<UserType>()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{currentUser}}>
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
