
<template>
  <!-- Contenedor Principal (Box sx en React) -->
  <div class="login-bg d-flex align-center justify-center">
    <v-container fluid class="fill-height d-flex justify-center align-center">
      <v-row justify="center" align="center" density="comfortable">
        <v-col cols="12" sm="6" md="6" lg="4" class="d-flex flex-column align-center justify-center">
          <v-card width="400px" elevation="8" class="pa-4 overflow-visible border position-relative">
            <div class="header-icon-container">
              <v-avatar id="clock" color="indigo-darken-4" size="64" class="elevation-3">
                <v-icon icon="mdi-lock-outline" size="32" color="white"></v-icon>
              </v-avatar>
              <h2 class="text-h5 mb-0 font-weight-black mt-4 text-uppercase tracking-wider">
                Iniciar Sesión
              </h2>
              <small class="text-body-2 text-medium-emphasis mb-6">
                Ingresa tus credenciales para continuar
              </small>
            </div>

            <v-card-text>
              <v-form id="login-form" @submit.prevent="onSubmit" ref="form">
                <v-row density="compact">

                  <v-col cols="12">
                    <v-text-field
                      v-model="data.usuario"
                      label="Usuario"
                      placeholder="Ej. admin_01"
                      variant="outlined"
                      persistent-placeholder
                      rounded="pill"
                      prepend-inner-icon="mdi-account-outline"
                      :rules="[v => !!v || 'Ingrese su usuario']"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="data.pssword"
                      label="Contraseña"
                      placeholder="••••••••"
                      variant="outlined"
                      persistent-placeholder
                      rounded="pill"
                      prepend-inner-icon="mdi-lock-outline"
                      :rules="[v => !!v || 'Ingrese su contraseña']"
                      :type="showPass ? 'text' : 'password'"
                      :append-inner-icon="showPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      @click:append-inner="showPass = !showPass"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>

            <v-card-actions class="pa-2 pt-0">
              <v-btn
                type="submit"
                form="login-form"
                color="indigo-darken-4"
                block
                size="xl"
                variant="flat"
                rounded="pill"
                class="font-weight-bold py-4 elevation-2"
                :loading="loading"
              >
                Acceder
              </v-btn>
            </v-card-actions>
          </v-card>

          <p class="text-center text-body-2 text-medium-emphasis mt-8">
            © {{ new Date().getFullYear() }} S.I Granja Infinito. Todos los derechos reservados.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-overlay v-model="loading" class="align-center justify-center" persistent>
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import RequestHttp from '../services/requestHttp'
import { useStore } from '../store'
import { useRouter } from 'vue-router'

// INSTANCES
const requestHttp = new RequestHttp()
const router = useRouter()
const store = useStore()

const showPass = ref(false)
const form = ref<any>(null)
const data = reactive({
  usuario: '',
  pssword: ''
})

const loading = ref(false)

// FUNCTIONS
async function onSubmit() {
  const { valid } = await form.value.validate()

  if (valid) {
    const response = await requestHttp.postLogin({
      "usuario": data.usuario,
      "password": data.pssword
    })

    if (response?.code === 200 || response?.code === 201) {
      store.login(response.access_token)
      router.push({
        path: '/'
      })
      setTimeout(()=> {
        router.go(0)
      }, 500)
    }
  }
}
</script>

<style scoped>
/* Fondo con degradado */
.login-bg {
  min-height: 100dvh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.header-icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: -50px; */
}

#clock {
  position: absolute;
  top: -30px;
}

.tracking-wider {
  letter-spacing: 1.5px !important;
}

.overflow-visible {
  /* overflow: visible !important; */
  border-radius: 50px;
}
</style>