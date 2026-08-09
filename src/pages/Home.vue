<template>
  <v-container fluid class="pa-8 bg-grey-lighten-5">
    <!-- Header -->
    <v-row class="mb-6">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold">
          {{ welcomeGreeting }}, <span class="text-primary">{{ name }}</span>
        </h1>
        <p class="text-body-1 text-grey-darken-1">Panel de métricas en tiempo real</p>
      </v-col>
    </v-row>

    <!-- KPI Cards con Sparklines -->
    <v-row>
      <v-col v-for="card in kpiCards" :key="card.title" cols="12" sm="6" lg="3">
        <v-card border flat class="rounded-xl overflow-hidden">
          <v-card-text class="pa-5">
            <div class="d-flex justify-space-between align-center mb-4">
              <div>
                <span class="text-overline text-grey-darken-1">{{ card.title }}</span>
                <div class="text-h4 font-weight-black">{{ card.value }}</div>
              </div>
              <v-avatar :color="card.color" variant="tonal" rounded="lg">
                <v-icon :icon="card.icon"></v-icon>
              </v-avatar>
            </div>

            <v-sparkline
              :model-value="card.data"
              :color="card.color"
              line-width="3"
              padding="16"
              smooth
              auto-draw
              height="60"
            ></v-sparkline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Resumen Inferior -->
    <v-row class="mt-6">
      <v-col cols="12" md="8">
        <v-card border flat class="rounded-xl pa-4">
          <v-card-title class="font-weight-bold">Actividad Semanal</v-card-title>
          <v-card-text>
            <v-sparkline
              :model-value="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
              color="primary"
              line-width="2"
              padding="8"
              fill
              smooth
              auto-draw
            ></v-sparkline>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card border flat class="rounded-xl pa-6 bg-primary text-white h-100 d-flex flex-column justify-center">
          <h3 class="text-h5 font-weight-bold">Tip de Hoy</h3>
          <p class="mt-2 text-body-2 opacity-80">
            Revisa los logs de PM2 para asegurar que los procesos del servidor sigan activos.
          </p>
          <v-btn variant="flat" color="white" class="mt-4 text-primary" rounded="lg" flat>
            Ver Logs
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// VARIABLES
const name: string = 'Leonardo'

const kpiCards = [
  { 
    title: 'Ingresos', 
    value: '$2,450', 
    icon: 'mdi-currency-usd', 
    color: 'success', 
    data: [0, 2, 5, 9, 5, 10, 3, 5] 
  },
  { 
    title: 'Nuevos Leads', 
    value: '42', 
    icon: 'mdi-account-multiple-outline', 
    color: 'primary', 
    data: [2, 12, 8, 10, 15, 11, 20, 18] 
  },
  { 
    title: 'Server Load', 
    value: '12%', 
    icon: 'mdi-server', 
    color: 'info', 
    data: [1, 5, 2, 2, 3, 2, 1, 2] 
  },
  { 
    title: 'Errores', 
    value: '0', 
    icon: 'mdi-alert-circle-outline', 
    color: 'error', 
    data: [0, 0, 1, 0, 0, 0, 0, 0] 
  },
]

// FUNCTIONS
const welcomeGreeting = computed(() => {
  const hours = new Date().getHours()
  if (hours < 12) return 'Buen día'
  if (hours < 18) return 'Buenas tardes'
  return 'Buenas noches'
})
</script>

<style scoped>
/* Transición suave para los cards */
.v-card {
  transition: all 0.3s ease;
}
.v-card:hover {
  border-color: rgba(var(--v-theme-primary), 0.5) !important;
  transform: translateY(-2px);
}
</style>