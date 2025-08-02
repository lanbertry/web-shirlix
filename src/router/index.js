import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/views/LoginVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginVue,
    },
  ],
})

export default router
