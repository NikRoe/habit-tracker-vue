import type { Habit } from '@/types/habits'
import { defineStore } from 'pinia'

const defaultHabits: Habit[] = [
  {
    id: 1,
    name: 'Reading',
    frequency: 'weekly',
    targetCount: 2,
    unit: 'chapters',
    color: 'amber',
    createdAt: '2026-07-10',
  },
  {
    id: 2,
    name: 'Meditate',
    frequency: 'daily',
    targetCount: 1,
    unit: 'times',
    color: 'green',
    createdAt: '2026-07-10',
  },
  {
    id: 3,
    name: 'Running',
    frequency: 'weekly',
    targetCount: 2,
    unit: 'times',
    color: 'orange',
    createdAt: '2026-07-10',
  },
]

export const useHabitsStore = defineStore('habits', {
  state: () => ({ habits: defaultHabits }),
  actions: {
    addHabit(newHabit: Habit) {
      this.habits.push(newHabit)
    },
    deleteHabit(id: number) {
      this.habits = this.habits.filter((habit) => habit.id !== id)
    },
    updateHabit(id: number, updatedHabit: Habit) {
      this.habits = this.habits.map((habit) => {
        if (habit.id === id) return updatedHabit
        return habit
      })
    },
  },
})
