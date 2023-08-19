import {collection, getDocs, query, where} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import {db} from '../../firebase-config'
import {IRequestStatus} from '../types/IRequestStatus'
import {IUser} from '../types/IUser'

const useQueryUsers = (searchInput: string) => {
  const [users, setUsers] = useState<IUser[]>([])
  const [status, setStatus] = useState<IRequestStatus>('idle')

  const usersRef = collection(db, 'users')

  useEffect(() => {
    const queryUser = async () => {
      setUsers([])
      if (!!searchInput.length) {
        setStatus('pending')
        try {
          const q = query(
            usersRef,
            where('lowerCaseDisplayName', '>=', searchInput),
            where('lowerCaseDisplayName', '<=', searchInput + '\uf8ff'),
          )

          const querySnapshot = await getDocs(q)
          querySnapshot.forEach(doc => {
            if (!users.find(item => item.uid === doc.data().uid)) {
              const userDoc = doc.data() as IUser
              setUsers(prev => [...prev, userDoc])
            }
          })
          setStatus('resolved')
        } catch (error) {
          console.log(error)
          setStatus('rejected')
        }
      }
    }
    const timer = setTimeout(() => {
      queryUser()
    }, 500)
    return () => clearTimeout(timer)
  }, [searchInput])

  return {users, status}
}

export default useQueryUsers
