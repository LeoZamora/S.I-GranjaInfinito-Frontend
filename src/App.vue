<template>
  <v-responsive>
    <v-app class="app">
      <v-navigation-drawer
        v-if="isLoggedin"
        v-model="data.drawer"
        width="245"
      >
        <template v-slot:prepend>
          <v-container class="d-flex justify-center align-center">
            <v-avatar class="elevation-4 border"
              :size="80"
              elevation="2"
              text="LZ"
              >
            </v-avatar>
          </v-container>

          <div class="d-flex justify-center flex-column align-center">
            <h3 class="font-weight-bold my-0">
              Leonardo Zamora
            </h3>

            <h5 class="font-weight-medium text-body-medium my-2">
              Administrador
            </h5>

            <small>
              Última sesión: Hoy a las 08:30
            </small>
          </div>

        </template>

        <v-divider class="mx-4 mt-4" />

        <v-container class="pt-2">
          <v-list density="compact" mandatory nav color="indigo-darken-4">
            <v-list-subheader class="font-weight-bold text-title" style="font-size: 14px;">
              Gestión General
            </v-list-subheader>

            <v-list-item prepend-icon="mdi-home" density="compact"
              rounded value="Inicio"
              class="font-weight-bold" to="/"
              active-class="menu-lateral font-weight-bold"
            >
              <template v-slot:title>
                Inicio
              </template>
            </v-list-item>
          </v-list>
        </v-container>

        <template v-slot:append>
          <v-list density="comfortable">
            <v-list-item color='error' rounded class="mx-2 rounded-pill"
              prepend-icon='mdi-logout' base-color="error"
              variant="tonal" title="Cerrar Sesion"
              @click="logout"
            >
            </v-list-item>
          </v-list>

          <v-divider class="mx-4" />
          <v-container class="pa-2 d-flex flex-column align-center justify-center" style="min-height: 58px;">
            <a href="https://devodigital.com" target="_blank" style="width: 100%; height: 100%;"
            >
              <v-img
                :src="imgDevo"
                max-width="50"
                max-height="50"
                cover
                class="mr-2"
              />
            </a>
            <small>
              Powered by <strong>DevoDigital</strong>
            </small>
          </v-container>
        </template>
      </v-navigation-drawer>

      <AppBar
        v-if="isLoggedin"
        @toggle-drawer="toggleDrawer"
      />

      <v-main>
        <router-view v-slot="{ Component }">
          <transition name="fade-transition">
            <keep-alive ref="aliveRef">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </v-main>

      <v-navigation-drawer
        v-if="isLoggedin"
        v-model="data.rail" rail
        location="end"
      >
        <template v-slot:append>
          <v-list nav density="compact">
            <v-list-item
              prepend-icon="mdi-account-cog"
              @click="toggleDrawer"
            >
            </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
import AppBar from '@/layout/AppBar.vue';
import { computed, reactive } from 'vue';
import { useStore } from './store';
import { useRouter } from 'vue-router';
import imgDevo from '/DevoDigital.svg'

// INTANCES
const router = useRouter()

// VARIABLES
const store = useStore()
const isLoggedin = computed(() => store.isLoggedIn)

const data = reactive({
  drawer: true,
  rail: true
})

// FUNCIONES
function toggleDrawer() {
  data.drawer = !data.drawer
}

async function logout() {
  store.logout()
  router.push({
    path: '/login'
  })
}

// HOOKS
</script>

<style scoped >
:deep(.v-list-item--active) {
  border-left: 4px solid;
  border-top-left-radius: 2 !important;
  border-bottom-left-radius: 2 !important;
  background-color: rgba(24, 103, 192, 0.05);
}

.app {
  font-family: 'Poppins' !important;
}

:deep() .v-list--density-compact .v-list-subheader {
  min-height: 12px !important;
}

:deep() .v-list-item--density-compact.v-list-item--one-line {
  min-height: 38px;
}
</style>