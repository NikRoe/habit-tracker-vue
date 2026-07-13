import type { Entry, NewEntry } from '@/types/entry'
import { defineStore } from 'pinia'

export const useEntriesStore = defineStore('entries', {
  state: () => ({ entries: [] as Entry[] }),
  getters: {
    isHabitDone: (state) => {
      return (id: number, todayString: string) =>
        state.entries.find((entry) => entry.habitId === id && entry.date === todayString)
          ?.completed ?? false
    },
  },
  actions: {
    async addEntry(newEntry: NewEntry) {
      const response = await fetch('/entries', {
        method: 'POST',
        body: JSON.stringify(newEntry),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to add new Entry.`)
      }

      const newEntryWithId: Entry = await response.json()

      this.entries.push(newEntryWithId)
    },
    async fetchEntriesForHabit(habitId: number) {
      const response = await fetch(`/habits/${habitId}/entries`)

      if (!response.ok) {
        throw new Error(`Failed to fetch entries for habit ${habitId}`)
      }

      const fetchedEntries: Entry[] = await response.json()

      const entriesWithoutFetchedOnes = this.entries.filter((entry) => entry.habitId !== habitId)
      this.entries = [...entriesWithoutFetchedOnes, ...fetchedEntries]
    },
  },
})
