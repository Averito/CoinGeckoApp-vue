import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import ConverterView from '@/views/ConverterView.vue'
import PortfolioView from '@/views/PortfolioView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: ConverterView
  },
  {
    path: '/portfolio',
    name: 'about',
    component: PortfolioView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
