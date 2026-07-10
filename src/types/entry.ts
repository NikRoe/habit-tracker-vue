export interface Entry {
  id: number
  habitId: number
  date: string
  value: number
  completed: boolean
}

export type NewEntry = Omit<Entry, 'id'>
