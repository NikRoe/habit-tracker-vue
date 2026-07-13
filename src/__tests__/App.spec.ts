import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { mount, RouterLinkStub } from '@vue/test-utils'
import App from '../App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import { routes } from '@/router'
import { createPinia } from 'pinia'

let router: Router
beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  })

   vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({ ok: true, json: async () => [] })),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('App', () => {
  it('mounts dashboard properly', async () => {
    router.push('/')

    await router.isReady()

    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [router, createPinia()],
      },
    })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/')
    expect(wrapper.html()).toContain('Dashboard')
  })
})
