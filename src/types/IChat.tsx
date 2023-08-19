export interface Message {
  date: string
  id: string
  senderId: string
  text: string
  file?: string | null
}
