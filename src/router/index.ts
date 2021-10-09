import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Auth/Login.vue'
import Home from '@/views/Home.vue'
import MainLayout from '@/components/Layouts/main/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',     // login auth form
    name: 'login',
    component: Login
  },
  {
    path: '/',    // main layout
    name: 'homeLayout',
    component: MainLayout,
    children: [
      {
        path:'',    // home page
        name:'home',
        components: {pageContent: Home}
      },

    ]
  },
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
