import { createMemoryHistory, createRouter } from 'vue-router'

import AppView from '@/App.vue'

const routes = [
  { path: '/', component: AppView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
