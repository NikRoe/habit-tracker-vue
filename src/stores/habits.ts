import type { Habit, NewHabit } from '@/types/habits'
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
    async fetchHabits() {
      const response = await fetch('/habits')

      if (!response.ok) {
        throw new Error('Failed to fetch habits.')
      }

      this.habits = await response.json()
    },
    async addHabit(newHabit: NewHabit) {
      const response = await fetch('/habits', {
        method: 'POST',
        body: JSON.stringify(newHabit),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error('Failed to add habit.')
      }

      const newHabitWithID = await response.json()
      this.habits.push(newHabitWithID)
    },
    async deleteHabit(id: number) {
      const response = await fetch(`/habits/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete habit ${id}`)
      }

      this.habits = this.habits.filter((habit) => habit.id !== id)
    },
    async updateHabit(id: number, updatedHabit: Partial<Habit>) {
      const response = await fetch(`/habits/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedHabit),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error(`Failed to update habit ${id}`)
      }

      this.habits = this.habits.map((habit) => {
        if (habit.id === id) return { ...habit, ...updatedHabit }
        return habit
      })
    },
  },
})
