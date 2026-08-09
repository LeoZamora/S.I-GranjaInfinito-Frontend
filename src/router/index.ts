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
    },
    {
        path: '/ejemplares',
        name: 'Ejemplares',
        component: () => import('@/modules/ejemplares/EjemplaresModule.vue'),
        meta: {
            title: 'Ejemplares | S.I Granja Infinito',
            keepAlive: true,
            requiresAuth: true,
            protected: true,
        }
    },
    {
        path: '/ejemplares/new',
        name: 'Crear Ejemplar',
        component: () => import('@/modules/ejemplares/CreateEjemplar.vue'),
        meta: {
            title: 'Ejemplares | S.I Granja Infinito',
            keepAlive: true,
            requiresAuth: true,
            protected: true,
        }
    },
    {
        path: '/ejemplares/:codigo',
        name: 'Detalle Ejemplar',
        component: () => import('@/modules/ejemplares/DetailsEjemplares.vue'),
        props: true,
        meta: {
            title: 'Ejemplares | S.I Granja Infinito',
            keepAlive: true,
            requiresAuth: true,
            protected: true,
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...routes
    ]
})

router.beforeEach((to) => {
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