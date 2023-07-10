import {createContext, useContext, useState} from 'react'
import {IUser} from '../types/IUser'

interface ChatContextValue {
  currentChatUser: IUser | null
  setCurrentChatUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

const initialValues = {
  currentChatUser: null,
  setCurrentChatUser: () => {},
}

const ChatContext = createContext<ChatContextValue | null>(initialValues)

interface ChatProviderProps {
  children: React.ReactNode
}
export const ChatProvider = ({children}: ChatProviderProps) => {
  const [currentChatUser, setCurrentChatUser] = useState<IUser | null>(null)
  return (
    <ChatContext.Provider value={{currentChatUser, setCurrentChatUser}}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context)
    throw new Error(
      'useChat may only be used from within a (child of a) ChatProvider.',
    )
  return context
}
