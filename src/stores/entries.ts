import type { Entry } from '@/types/entry'
import { defineStore } from 'pinia'

export const useEntriesStore = defineStore('entries', {
  state: () => ({ entries: [] as Entry[] }),
  getters: {
    isHabitDone: (state) => {
      return (id: number) => state.entries.find((entry) => entry.habitId === id)?.completed
    },
  },
  actions: {
    addEntry(newEntry: Entry) {
      this.entries.push(newEntry)
    },
  },
})
