import { useEntriesStore } from '@/stores/entries'
import type { NewEntry } from '@/types/entry'
import type { Habit } from '@/types/habits'
import { toDateString } from '@/utils/date'
import { ref, watch, type Ref } from 'vue'

export function useEntries(habits: Ref<Habit[]>) {
  const isSaving = ref(false)
  const saveError = ref<Error>()

  const store = useEntriesStore()

  watch(habits, async (currentHabits) => {
    await Promise.all(currentHabits.map((habit) => store.fetchEntriesForHabit(habit.id)))
  })

  function isHabitDoneToday(habitId: number) {
    return store.isHabitDone(habitId, toDateString(new Date()))
  }

  async function checkOffHabit(habit: Habit) {
    isSaving.value = true
    try {
      const newEntry: NewEntry = {
        habitId: habit.id,
        value: habit.targetCount,
        completed: true,
        date: toDateString(new Date()),
      }
      await store.addEntry(newEntry)
    } catch (error) {
      saveError.value = error as Error
    } finally {
      isSaving.value = false
    }
  }

  return { checkOffHabit, isSaving, saveError, isHabitDoneToday }
}
