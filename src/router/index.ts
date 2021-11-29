import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Auth/Login.vue'
import Home from '@/views/Home.vue'
import StatusMapping from '@/views/StatusMapping.vue'
import WarehouseMapping from '@/views/WarehouseMapping.vue'
import Users from '@/views/Users.vue'
import MainLayout from '@/components/Layouts/main/Index.vue'
import { auth, guest, getAdminUserStateFromBackend, setSidebarActiveItem, setPageTitle } from '@/app/Middlewares/Kernel'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',         // login auth form
        name: 'login',
        meta: {
            middlewares: [
                guest
            ]
        },
        component: Login,
        
    },
    {
        path: '/',              // main layout
        name: 'homeLayout',
        component: MainLayout,
        meta: {
            middlewares: [
                auth,
                setSidebarActiveItem,
                setPageTitle
            ]
        },
        children: [
            {
                path: '',       // home page
                name: 'home',
                components: { pageContent: Home },
                meta: {
                    title: 'Главная'
                }
            },
            {
                path: '/statuses',       // status mapping
                name: 'statuses',
                components: { pageContent: StatusMapping },
                meta: {
                    title: 'Маппинг статусов'
                }
            },
            {
                path: '/warehouses',       // status mapping
                name: 'warehouses',
                components: { pageContent: WarehouseMapping },
                meta: {
                    title: 'Маппинг складов'
                }
            },
            {
                path: '/users',       // users
                name: 'users',
                components: { pageContent: Users },
                meta: {
                    title: 'Пользователи'
                }
            },
            {
                path: '/account',       // users
                name: 'account',
                components: { pageContent: Users },
                meta: {
                    title: 'Аккаунт'
                }
            },

        ]
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach(async (to, from, next) => {
    await getAdminUserStateFromBackend(to, from)  // get admin user state from backend when reload page or first initial

    // set active meta (for sidebar)
    to.meta.isActive = true;

    if (!to.meta.middlewares) {
        return next();
    }
    // handle middlewares from routes
    for (const middleware of to.meta.middlewares as any) {
        middleware(to, from)
    }
    
    return next();
})



export default router
