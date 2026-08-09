<template>
  <div class="w-100 ma-auto pa-4">
    <div class="w-100 d-flex flex-wrap justify-space-between align-center">
      <h2 class="mt-0">
        Catalogo de Ejemplares
      </h2>

      <v-btn color="indigo-darken-4" prepend-icon="mdi-plus" variant="tonal" @click="newEjemplar()">
        Nuevo Ejemplar
      </v-btn>
    </div>

    <v-row>
      <v-col cols="12" md="2" class="border-e">

      </v-col>
      <v-col cols="12" md="10" class="">
        <v-container>
          <v-row density="compact" class="d-flex justify-end align-center">
            <v-col cols="12" md="6" sm="12">
              <v-text-field
                label="Buscar"
                variant="outlined"
                density="compact"
                rounded="lg"
                hide-details
                color="indigo-darken-4"
                placeholder="Buscar"
                persistent-placeholder
                append-inner-icon="mdi-magnify"
              />
            </v-col>
          </v-row>

          <v-divider class="my-5" />

          <v-row density="comfortable">
            <v-col v-for="(card, i) in data.catalog" :key="i" cols="12" sm="6" md="4" lg="4">

              <!-- Tarjeta con altura fija y bordes redondeados -->
              <v-card height="250" class="rounded-xl overflow-hidden cursor-pointer" elevation="5" @click="goToDetails(card.code)">
                <v-img
                  :src="card.img"
                  height="100%"
                  width="100%"
                  cover
                  gradient="to bottom, rgba(0,0,0,0.5) 0%, transparent 40%, rgba(0,0,0,0.8) 100%"
                >
                  <!-- Código: Superior Izquierda -->
                  <div class="position-absolute top-0 left-0 pa-3 text-white font-weight-bold text-subtitle-1">
                    {{ card.code }}
                  </div>

                  <div class="position-absolute top-0 right-0 pa-3">
                    <v-chip color="white" text-color="white" size="small" class="font-weight-bold">
                      {{ card.weigth }}
                    </v-chip>
                  </div>

                  <!-- Nombre: Inferior Derecha -->
                  <div class="position-absolute bottom-0 right-0 pa-4 text-white text-h5 font-weight-black">
                    {{ card.name }}
                  </div>
                </v-img>
              </v-card>

            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import pigImg from '../../../public/imgs/pig.jpg'
import router from "../../router";

//INTANCES


// VARIABLES

const data = reactive({
  catalog: [{
    img: pigImg,
    code: 'TN40',
    name: 'Ejemplares',
    weigth: '150 lbs',
  }, {
    img: pigImg,
    code: 'TN40',
    name: 'Ejemplares',
    weigth: '150 lbs',
  }, {
    img: pigImg,
    code: 'TN40',
    name: 'Ejemplares',
    weigth: '150 lbs',
  },{
    img: pigImg,
    code: 'TN40',
    name: 'Ejemplares',
    weigth: '150 lbs',
  }, {
    img: pigImg,
    code: 'TN40',
    name: 'Ejemplares',
    weigth: '150 lbs',
  },{
    img: pigImg,
    code: 'TN40',
    name: 'Ejemplares',
    weigth: '150 lbs',
  },{
    img: pigImg,
    code: 'TN40',
    name: 'Ejemplares',
    weigth: '150 lbs',
  },{
    img: pigImg,
    code: 'TN40',
    name: 'Ejemplares',
    weigth: '150 lbs',
  },{
    img: pigImg,
    code: 'TN40',
    name: 'Ejemplares',
    weigth: '150 lbs',
  },{
    img: pigImg,
    code: 'TN40',
    name: 'Ejemplares',
    weigth: '150 lbs',
  }]
})


// FUNCTIONS
async function goToDetails(code: string) {
   await router.push({
     name: 'Detalle Ejemplar',
     params: { codigo: code }
  })
}

function newEjemplar() {
  router.push({
    path: '/ejemplares/new'
  })
}
</script>

<style scoped>

</style>