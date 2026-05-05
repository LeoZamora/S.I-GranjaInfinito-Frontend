import { createRouter, createWebHashHistory } from "vue-router";
import { useStore } from '../store';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/Home.vue'),
        meta: {
            title: 'Inicio | S.I Granja Infinito',
            keepAlive: false,
            requiresAuth: true,
            protected: true,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/LoginApp.vue'),
        meta: {
            title: 'Login | S.I Granja Infinito',
            keepAlive: false,
            requiresAuth: false,
            protected: false,
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...routes
    ]
})

router.beforeEach((to, from) => {
    const store = useStore()
    const defaultTitle: any = 'S.I Granja Infinito'
    document.title = to.meta?.title ?? defaultTitle
    const isLoggeding = store.isLoggedIn

    if (!isLoggeding && to.path !== '/login') {
        return { path: '/login' }
    }

    if (isLoggeding && to.path === '/login') {
        return { path: '/' }
    }

    return true
})

export default router