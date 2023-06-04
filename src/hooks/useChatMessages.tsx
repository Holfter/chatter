import {useEffect, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {doc, onSnapshot} from 'firebase/firestore'
import {db} from '../../firebase-config'
import {IUser} from '../types/IUser'
import {Message} from '../types/IChat'

const useChatMessages = (currentFriend: IUser | null) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const {currentUser} = useAuth()

  useEffect(() => {
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
      })
      return () => {
        unSub()
      }
    }
  }, [currentFriend])

  return {chatMessages}
}

export default useChatMessages
