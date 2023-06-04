import {collection, getDocs, query, where} from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import {IUser} from '../types/IUser'
import {db} from '../../firebase-config'

const useQueryUsers = (searchInput: string) => {
  const [users, setUsers] = useState<IUser[]>([])

  const usersRef = collection(db, 'users')

  useEffect(() => {
    const queryUser = async () => {
      setUsers([])
      if (!!searchInput.length) {
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
        } catch (error) {
          console.log(error)
        }
      }
    }
    const timer = setTimeout(() => {
      queryUser()
    }, 500)
    return () => clearTimeout(timer)
  }, [searchInput])

  return {users}
}

export default useQueryUsers
