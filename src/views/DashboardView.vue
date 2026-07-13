<script setup lang="ts">
import { useHabits } from '@/composables/useHabits'
import { useEntries } from '@/composables/useEntries'
import { habitColorClasses } from '@/utils/habitColors'

const { isLoading, fetchError, habits } = useHabits()
const { checkOffHabit, isSaving, saveError, isHabitDoneToday } = useEntries(habits)
</script>

<template>
  <h1>Dashboard</h1>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="fetchError">Error while Loading: {{ fetchError.message }}</p>
  <ul v-else>
    <li v-for="habit in habits" :key="habit.id" class="flex justify-center gap-1">
      <span
        aria-hidden
        class="inline-block h-5 w-5 rounded-xl"
        :class="habitColorClasses[habit.color]"
      ></span>
      {{ habit.name }}
      <button
        v-if="!isHabitDoneToday(habit.id)"
        type="button"
        @click="checkOffHabit(habit)"
        :disabled="isSaving"
        :aria-disabled="isSaving"
        class="cursor-pointer"
      >
        Als abgeschlossen markieren
      </button>
      <span v-else>☑️</span>
    </li>
  </ul>
  <p v-if="saveError">Error marking habit as done: {{ saveError.message }}</p>
</template>
