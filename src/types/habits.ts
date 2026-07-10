export interface Habit {
  id: number
  name: string
  frequency: HabitFrequency
  targetCount: number
  unit: HabitUnit
  color: HabitColor
  createdAt: string
}

export type NewHabit = Omit<Habit, 'id'>

type HabitFrequency = 'daily' | 'weekly' | 'bi-weekly' | 'monthly'

type HabitUnit = 'times' | 'pages' | 'chapters' | 'minutes'

type HabitColor = 'red' | 'orange' | 'amber' | 'green' | 'teal' | 'blue' | 'indigo' | 'pink'
