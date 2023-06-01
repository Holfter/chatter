import {User} from 'firebase/auth'

export interface IUser extends Partial<User> {
  displayName: string
  email: string
  id: string
  photoURL: string
  uid: string
}
