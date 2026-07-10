import type { Habit } from '@/types/habits'

export const mockHabits: Habit[] = [
  {
    id: 1,
    name: 'Reading',
    frequency: 'weekly',
    targetCount: 2,
    unit: 'chapters',
    color: 'amber',
    createdAt: '10-07-2026',
  },
  {
    id: 2,
    name: 'Meditate',
    frequency: 'daily',
    targetCount: 1,
    unit: 'times',
    color: 'green',
    createdAt: '10-07-2026',
  },
  {
    id: 3,
    name: 'Running',
    frequency: 'weekly',
    targetCount: 2,
    unit: 'times',
    color: 'orange',
    createdAt: '10-07-2026',
  },
]
