import { http, HttpResponse } from 'msw'
import { mockHabits } from './habits'
import { mockEntries } from './entries'
import type { Habit, NewHabit } from '@/types/habits'
import type { NewEntry } from '@/types/entry'

function getNextId(items: { id: number }[]): number {
  return Math.max(0, ...items.map((item) => item.id)) + 1
}

export const handlers = [
  http.get('/habits', () => {
    return HttpResponse.json(mockHabits)
  }),
  http.post('/habits', async ({ request }) => {
    const newHabit = (await request.json()) as NewHabit
    const createdHabit = { ...newHabit, id: getNextId(mockHabits) }
    mockHabits.push(createdHabit)

    return HttpResponse.json(createdHabit, { status: 201 })
  }),
  http.patch('/habits/:id', async ({ params, request }) => {
    const { id } = params

    const updatedHabit = (await request.json()) as Partial<Habit>
    const index = mockHabits.findIndex((habit) => habit.id === Number(id))

    const existingHabit = mockHabits[index]

    if (!existingHabit) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    mockHabits[index] = { ...existingHabit, ...updatedHabit }
    return HttpResponse.json({ message: `Habit with id: ${id} updated.` })
  }),
  http.delete('/habits/:id', ({ params }) => {
    const { id } = params
    const index = mockHabits.findIndex((habit) => habit.id === Number(id))

    if (index === -1) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    mockHabits.splice(index, 1)
    return HttpResponse.json({ message: `Habit with id: ${id} deleted.` })
  }),
  http.get('/habits/:id/entries', ({ params }) => {
    const { id } = params
    const entries = mockEntries.filter((entry) => entry.habitId === Number(id))

    return HttpResponse.json(entries)
  }),
  http.post('/entries', async ({ request }) => {
    const newEntry = (await request.json()) as NewEntry
    const createdEntry = { ...newEntry, id: getNextId(mockEntries) }
    mockEntries.push(createdEntry)
    return HttpResponse.json(createdEntry, { status: 201 })
  }),
  http.get('/stats/streaks', () => {
    return HttpResponse.json([])
  }),
]
