import {signInWithPopup} from 'firebase/auth'
import {doc, getDoc, setDoc} from 'firebase/firestore'
import Cookies from 'universal-cookie'
import {auth, db, provider} from '../../firebase-config'

const cookies = new Cookies()

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider)

    const {displayName, email, photoURL} = res.user

    await setDoc(doc(db, 'users', res.user.uid), {
      uid: res.user.uid,
      displayName,
      lowerCaseDisplayName: displayName?.toLowerCase(),
      email,
      photoURL,
    })

    // Check if the document exists before creating a new one
    const userChatsRef = doc(db, 'userChats', res.user.uid)
    const userChatsSnapshot = await getDoc(userChatsRef)
    if (!userChatsSnapshot.exists()) {
      // This is used to keep track of the user's chat list and also
      // to show the last message below the friend's name
      await setDoc(doc(db, 'userChats', res.user.uid), {})
    }
    cookies.set('auth-token', res.user.refreshToken)
    window.location.href = '/'
  } catch (error) {
    throw error
  }
}

export default signInWithGoogle
