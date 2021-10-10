import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Auth/Login.vue'
import Home from '@/views/Home.vue'
import MainLayout from '@/components/Layouts/main/Index.vue'
import { auth, getAdminUserStateFromBackend } from '@/app/Middlewares/Kernel'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',         // login auth form
        name: 'login',
        component: Login,
        
    },
    {
        path: '/',              // main layout
        name: 'homeLayout',
        component: MainLayout,
        meta: {
            middlewares: [
                auth
            ]
        },
        children: [
            {
                path: '',       // home page
                name: 'home',
                components: { pageContent: Home }
            },

        ]
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach(async (to, from, next) => {
    await getAdminUserStateFromBackend(to, from, next)  // get admin user state from backend when reload page or first initial

    if (!to.meta.middlewares) {
        return next();
    }
    // handle middlewares from routes
    for (const middleware of to.meta.middlewares as any) {
        middleware(to, from, next)
    }
})



export default router
