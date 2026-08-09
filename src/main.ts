import { createApp } from 'vue'
import App from './App.vue'

import 'unfonts.css'
import './style.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { es } from 'vuetify/locale'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'

// COMPONENTS
import { VDateInput } from 'vuetify/components/VDateInput'

// PINIA
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
const app = createApp(App)
app.use(pinia)

const vuetify = createVuetify({
    components: {
        ...components,
        VDateInput
    },
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                variables: {
                    'font-family': '"Poppins", "Roboto", sans-serif',
                }
            }
        }
    },
    icons: {
        defaultSet: 'mdi'
    },
    locale: {
        locale: 'es',
        messages: { es }
    },
})

app
    .use(vuetify)
    .use(router)

app.mount('#app')
