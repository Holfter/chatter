import {useEffect, useState} from 'react'
import {auth} from '../../firebase-config'
import {User, onAuthStateChanged} from 'firebase/auth'
import {IUser} from '../types/IUser'

type UserType = IUser | null | undefined

interface HookReturn {
  currentUser: UserType
  loading: boolean
}

const useAuthObserver = (): HookReturn => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsbricribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user as IUser)
      setLoading(false)
    })

    return unsbricribe
  }, [auth])

  return {currentUser, loading}
}

export default useAuthObserver
