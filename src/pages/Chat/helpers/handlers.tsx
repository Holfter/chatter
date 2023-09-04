import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {v4 as uuid} from 'uuid'
import {db, storage} from '../../../../firebase-config'
import {IUser, UserType} from '../../../types/IUser'

// This is use to select a friend to start a conversation
export async function createUserChat(
  currentUser: UserType,
  currentFriend: IUser | null,
) {
  //check whether the group(chats in firestore) exists, if not create
  if (currentUser?.uid && currentFriend?.uid) {
    const combinedId =
      currentUser.uid > currentFriend.uid
        ? currentUser.uid + currentFriend.uid
        : currentFriend.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, 'chats', combinedId))

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), {messages: []})

        //create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: currentFriend.uid,
            displayName: currentFriend.displayName,
            lowerCaseDisplayName: currentUser.displayName.toLowerCase(),
            photoURL: currentFriend.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })

        await updateDoc(doc(db, 'userChats', currentFriend.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            lowerCaseDisplayName: currentUser.displayName.toLowerCase(),
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (err) {
      console.error('HANDLE SELECT FRIEND ERROR =>', err)
    }
  }
}

interface IHandleSendParams {
  currentUser: UserType
  currentFriend: IUser | null
  text: string
  file?: File | null
}

// Send message to the user
export async function sendMessage({
  currentUser,
  currentFriend,
  text,
  file,
}: IHandleSendParams) {
  try {
    await createUserChat(currentUser, currentFriend)
    if (currentUser && currentFriend) {
      const combinedId =
        currentUser.uid > currentFriend.uid
          ? currentUser.uid + currentFriend.uid
          : currentFriend.uid + currentUser.uid

      if (file) {
        const storageRef = ref(storage, `files/${file.name + uuid()}`)

        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', () => {
          if (uploadTask.snapshot.ref) {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async downloadURL => {
                await updateDoc(doc(db, 'chats', combinedId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser?.uid,
                    date: Timestamp.now(),
                    file: downloadURL,
                  }),
                })
              })
              .catch(error => console.log('error', error))
          }
        })
      } else {
        await updateDoc(doc(db, 'chats', combinedId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser?.uid,
            date: Timestamp.now(),
          }),
        })
      }

      await updateDoc(doc(db, 'userChats', currentUser?.uid), {
        [combinedId + '.lastMessage']: {
          text,
        },
        [combinedId + '.date']: serverTimestamp(),
      })

      await updateDoc(doc(db, 'userChats', currentFriend.uid), {
        [combinedId + '.lastMessage']: {
          text,
        },
        [combinedId + '.date']: serverTimestamp(),
      })
    }
  } catch (error) {
    throw error
  }
}
