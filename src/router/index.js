import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import ForbiddenView from '@/views/error/ForbiddenView.vue'
import NotFoundView from '@/views/error/NotFoundView.vue'
import { getUserInformation, isAuthenticated } from '@/utils/supabase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresAuth: false,
      },
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requiresAuth: false,
      },
    },

    {
      path: '/system/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
    },

    {
      path: '/not-found',
      name: 'not-found',
      component: NotFoundView,
    },

    {
      path: '/:catchAll(.*)*',
      component: NotFoundView,
    },
  ],
})

router.beforeEach(async (to) => {
  // Load if user is logged in
  const isLoggedIn = await isAuthenticated()

  // Redirect to appropriate page if accessing home route
  if (to.name === 'home') {
    return isLoggedIn ? { name: 'dashboard' } : { name: 'login' }
  }

  // If logged in, prevent access to login or register pages
  if (isLoggedIn && !to.meta.requiresAuth) {
    // redirect the user to the dashboard page
    return { name: 'dashboard' }
  }

  // If not logged in, prevent access to system pages
  if (!isLoggedIn && !to.meta.requiresAuth) {
    // redirect the user to the login page
    return { name: 'login' }
  }

  if (isLoggedIn) {
    const userMetadata = await getUserInformation()
    const isAdmin = userMetadata.is_admin
    // const isCashier = userMetadata.is_cashier

    if (!isAdmin && to.meta.requiresAdmin) {
      return { name: 'forbidden' }
    }
  }
})

export default router
