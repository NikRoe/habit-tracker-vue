import { onMounted, ref } from 'vue'
import { useHabitsStore } from '@/stores/habits'
import { storeToRefs } from 'pinia'

export function useHabits() {
  const isLoading = ref(false)
  const fetchError = ref<Error>()

  const store = useHabitsStore()

  const { habits } = storeToRefs(store)

  onMounted(async () => {
    isLoading.value = true
    try {
      await store.fetchHabits()
    } catch (error) {
      fetchError.value = error as Error
    } finally {
      isLoading.value = false
    }
  })

  return { isLoading, fetchError, habits }
}
