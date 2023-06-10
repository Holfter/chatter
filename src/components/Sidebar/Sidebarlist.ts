import {signOut} from 'firebase/auth'
import {auth} from '../../../firebase-config'

export const topSidebarList = [
  {
    name: 'Profile',
    icon: 'person_icon',
    path: '/profile',
  },
  {
    name: 'Chat',
    icon: 'sms_icon',
    path: '/chat',
  },
]

export const bottomSidebarList = [
  {
    name: 'Settings',
    icon: 'settings_icon',
  },
  {
    name: 'Logout',
    icon: 'logout_icon',
    callbackFunc: () => signOut(auth),
  },
]
