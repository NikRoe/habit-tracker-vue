import { describe, it, expect, beforeEach } from 'vitest'

import { mount, RouterLinkStub } from '@vue/test-utils'
import App from '../App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import { routes } from '@/router'

let router: Router
beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  })
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
        plugins: [router],
      },
    })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/')
    expect(wrapper.html()).toContain('Dashboard')
  })
})
