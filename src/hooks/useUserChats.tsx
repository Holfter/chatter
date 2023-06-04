import {useEffect, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {doc, onSnapshot} from 'firebase/firestore'
import {UserChat} from '../types/IUser'
import {db} from '../../firebase-config'

const useUserChats = () => {
  const [userChats, setUserChats] = useState<UserChat[]>([])
  const {currentUser} = useAuth()
  useEffect(() => {
    if (currentUser) {
      const unSub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
        doc.exists() && setUserChats(doc.data() as UserChat[])
      })
      return () => {
        unSub()
      }
    }
  }, [])

  return {userChats}
}

export default useUserChats
