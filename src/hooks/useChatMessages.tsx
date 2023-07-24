import {doc, onSnapshot} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import {db} from '../../firebase-config'
import {useAuth} from '../contexts/AuthContext'
import {Message} from '../types/IChat'
import {IUser} from '../types/IUser'

const useChatMessages = (currentFriend: IUser | null) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const {currentUser} = useAuth()

  useEffect(() => {
    setLoading(true)
    if (currentUser && currentFriend) {
      const combinedId =
        currentUser.uid > currentFriend.uid
          ? currentUser.uid + currentFriend.uid
          : currentFriend.uid + currentUser.uid
      const unSub = onSnapshot(doc(db, 'chats', combinedId), doc => {
        if (doc.exists()) {
          setChatMessages(doc.data().messages)
        } else {
          setChatMessages([])
        }
        setLoading(false)
      })
      return () => {
        unSub()
      }
    }
  }, [currentFriend])

  return {chatMessages, loading}
}

export default useChatMessages
