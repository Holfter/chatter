import {doc, onSnapshot} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import {db} from '../../firebase-config'
import {useAuth} from '../contexts/AuthContext'
import {UserChat} from '../types/IUser'

const useUserChats = () => {
  const [userChats, setUserChats] = useState<UserChat[]>([])
  const [loading, setLoading] = useState(true)
  const {currentUser} = useAuth()
  useEffect(() => {
    if (currentUser) {
      const unSub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
        doc.exists() && setUserChats(doc.data() as UserChat[])
        setLoading(false)
      })
      return () => {
        unSub()
      }
    }
  }, [])

  return {userChats, loading}
}

export default useUserChats
