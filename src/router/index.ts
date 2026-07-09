import DashboardView from '@/views/DashboardView.vue'
import HabitsView from '@/views/HabitsView.vue'
import StatsView from '@/views/StatsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { name: 'dashboard', path: '/', component: DashboardView },
  { name: 'habits', path: '/habits', component: HabitsView },
  { name: 'stats', path: '/stats', component: StatsView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export { routes }

export default router
