<script setup lang="ts"></script>

<template>
  <nav>
    <RouterLink to="/">Go to Dashboard</RouterLink>
    <RouterLink to="/habits">Go to Habits</RouterLink>
    <RouterLink to="/stats">Go to Stats</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
