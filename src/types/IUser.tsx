import {User} from 'firebase/auth'

export type UserType = IUser | null | undefined

export interface IUser extends User {
  displayName: string
  lowerCaseDisplayName: string
  email: string
  id: string
  photoURL: string
  uid: string
}

export interface UserChat {
  date: string
  lastMessage: {text: string}
  userInfo: IUser
}
