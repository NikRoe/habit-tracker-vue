<script setup lang="ts">
import { useHabits } from '@/composables/useHabits'
import { habitColorClasses } from '@/utils/habitColors'

const { isLoading, fetchError, habits } = useHabits()
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
    </li>
  </ul>
</template>
