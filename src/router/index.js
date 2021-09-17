import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/landing/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
  path: '/bank',
  redirect: '/bank/search',
  component: () => import('@/components/Layout.vue') ,
  children : [
    { path: 'search', name: 'BankSearch', component: () => import('@/bank/Search.vue') }
  ]
  },
  {
  path: '/user',
  redirect: '/user/search',
  component: () => import('@/components/Layout.vue') ,
  children : [
    { path: 'search', name: 'UserSearch', component: () => import('@/user/Search.vue') }
  ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
