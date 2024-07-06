import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@/views/Home.vue'

const routes = [
  { path: '/', name: '首页', component: HomeView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
