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

    <v-divider />

    <v-row density="compact">
      <v-col cols="12" md="2" lg="2" sm="2" class="border-e">
        <div class="text-subtitle-1 font-weight-bold my-3 text-indigo-darken-4 d-flex align-center">
          <v-icon start size="small">mdi-sort-variant</v-icon>
          Ordenar Por
        </div>

        <v-list density="compact" nav bg-color="transparent">
          <v-list-item
              v-for="item in data.opcionesOrden"
              :key="item.value"
              :value="item.value"
              :active="data.requestParams.paginacion.ordenarPor === item.value"
              v-model="data.requestParams.paginacion.ordenarPor"
              @click="data.requestParams.paginacion.ordenarPor = item.value"
              color="indigo-darken-4"
              rounded="lg"
              class="mb-1"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" size="small" class="mr-3"></v-icon>
            </template>
            <v-list-item-title class="text-body-2 font-weight-medium">
              {{ item.nombre }}
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider class="my-4"></v-divider>

        <!-- Dirección del Orden (Ascendente / Descendente) -->
        <div class="text-subtitle-2 font-weight-bold mb-2 text-indigo-darken-4">
          Dirección
        </div>

        <v-btn-toggle
            v-model="data.requestParams.paginacion.ordenarDir"
            color="indigo-darken-4"
            variant="outlined"
            density="compact"
            divided
            class="w-100 px-2"
            @update:model-value="cargarCatalogo"
        >
          <v-btn value="ASC" class="flex-grow-1" size="small">
            <v-icon size="small" class="mr-1">mdi-arrow-up</v-icon> ASC
          </v-btn>
          <v-btn value="DESC" class="flex-grow-1" size="small">
            <v-icon size="small" class="mr-1">mdi-arrow-down</v-icon> DESC
          </v-btn>
        </v-btn-toggle>
      </v-col>

      <v-col cols="12" md="10">
        <v-container>
          <!-- Buscador -->
          <v-row density="compact" class="d-flex justify-end align-center">
            <v-col cols="6" md="4" sm="4">
              <v-autocomplete clearable v-model="data.requestParams.filtros.idRaza" :items="data.razas" item-title="nombre" item-value="id" label="Raza" prepend-inner-icon="mdi-dna" color="indigo-darken-4" variant="outlined" density="comfortable" hide-details rounded="xl" />
            </v-col>

            <v-col cols="6" md="4" sm="4">
              <v-autocomplete clearable v-model="data.requestParams.filtros.idLote" :items="data.lotes" item-title="nombre" item-value="id" label="Lote" prepend-inner-icon="mdi-format-list-group" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" hide-details/>
            </v-col>

            <v-col cols="12" md="4" sm="4">
              <v-text-field
                label="Buscar"
                variant="outlined"
                density="comfortable"
                rounded="xl"
                hide-details
                color="indigo-darken-4"
                placeholder="Buscar"
                persistent-placeholder
                append-inner-icon="mdi-magnify"
              />
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12" class="d-flex justify-end">
              <v-pagination
                  v-model="data.requestParams.paginacion.pagina"
                  :length="totalPages"
                  show-first-last-page
                  :total-visible="5"
                  color="indigo-darken-4"
                  rounded="circle"
                  density="compact"
                  variant="plain"
                  @update:model-value="cargarCatalogo"
              ></v-pagination>
            </v-col>
          </v-row>

          <v-divider class="mb-4"></v-divider>

          <!-- Grilla del Catálogo -->

          <v-row density="comfortable" v-if="data.loading">
            <v-col v-for="(_, i) in data.cards" :key="i" cols="12" sm="6" md="4" lg="4">
              <v-skeleton-loader
                :loading="data.loading"
                height="240"
                type="image, list-item-two-line"
              >
              </v-skeleton-loader>
            </v-col>
          </v-row>

          <v-row density="comfortable" v-else>
            <v-col v-for="(card, i) in data.catalog" :key="i" cols="12" sm="6" md="4" lg="4">
              <v-card height="200" class="rounded-xl overflow-hidden cursor-pointer" elevation="5" @click="goToDetails(card.idCerdo)">
                <v-img
                  :src="card.imgUrl"
                  height="100%"
                  width="100%"
                  cover
                  gradient="to bottom, rgba(0,0,0,0.5) 0%, transparent 40%, rgba(0,0,0,0.8) 100%"
                >
                  <div class="position-absolute top-0 left-0 pa-3 text-white font-weight-bold text-subtitle-1">
                    {{ card.codigo }}
                  </div>

                  <div class="position-absolute top-0 right-0 pa-2">
                     <v-btn
                       @click.stop="editEjemplar(card.idCerdo)"
                       icon="mdi-pencil"
                       size="small"
                       variant="flat"
                       color="green"
                     />
                  </div>

                  <div class="position-absolute left-0 bottom-0 right-0 d-flex justify-space-between align-center">
                    <div class="pa-3">
                      <v-chip color="white" text-color="white" size="small" class="font-weight-bold">
                        {{ card.pesoActual }} LBS
                      </v-chip>
                    </div>
                    <div class="px-4 text-white font-weight-black" style="font-size: 14px">
                      {{ card.nombre }}
                    </div>
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
import {reactive, onMounted, ref, watch} from "vue";
// @ts-ignore
import type {Ejemplar, ItemsCombobox, porcinosPagination} from "@/common/types/apiTypes.ts";
import {useRouter} from "vue-router";
// @ts-ignore
import RequestHttp from "@/services/requestHttp.ts";
// @ts-ignore
import type {ListarEjemplares} from "@/common/interfaces/interfaces.ts";
// @ts-ignore
import {endPoints} from "@/api/endPoints.ts";

const router = useRouter();
const requestHttp = new RequestHttp();

//INTANCES


// VARIABLES

const data = reactive({
  catalog: [] as Ejemplar[],
  cards: [{}, {}, {}, {}, {}, {}],
  loading: false,
  opcionesOrden: [
    { nombre: 'Fecha de Registro', value: 'createdAt', icon: 'mdi-clock-outline' },
    { nombre: 'Fecha de Ingreso', value: 'fechaIngreso', icon: 'mdi-calendar-import' },
    { nombre: 'Nombre', value: 'nombre', icon: 'mdi-tag-text-outline' },
    { nombre: 'Peso Actual', value: 'pesoActual', icon: 'mdi-scale-bathroom' },
    { nombre: 'Código (ID)', value: 'codigo', icon: 'mdi-barcode' }
  ],
  requestParams: {
    paginacion: {
      pagina: 1,
      porPagina: 6,
      ordenarPor: 'createdAt',
      ordenarDir: 'DESC',
    },
    filtros: {
      idLote: null,
      idRaza: null,
    }
  },
  razas: [] as ItemsCombobox[],
  lotes: [] as ItemsCombobox[],
})

// @ts-ignore
async function cambiarOrden (nuevoValor: string) {
  if (data.requestParams.paginacion.ordenarPor !== nuevoValor) {
    data.requestParams.paginacion.ordenarPor = nuevoValor;
    data.requestParams.paginacion.pagina = 1;

    await cargarCatalogo();
  }
};

async function getCombobox () {
  try {
    const [
      razas,
      lotes,
    ] = await Promise.all([
      requestHttp.getItemsCombobox(endPoints.getRazasCbx),
      requestHttp.getItemsCombobox(endPoints.getLotesCbx),
    ])

    data.razas = razas.data
    data.lotes = lotes.data

  } catch (e) {
    console.log(e)
  }
}


// FUNCTIONS
async function goToDetails(id: number) {
   await router.push({
     name: 'Detalle Ejemplar',
     params: { id }
  })
}

function newEjemplar() {
  router.push({
    path: '/ejemplares/new'
  })
}

async function editEjemplar(id: number) {
  await router.push({
    name: 'Editar Ejemplar',
    params: { id }
  })
}

const totalPages = ref(5);

async function  cargarCatalogo () {
  data.catalog = []
  data.loading = true
  const response = await requestHttp.getPorcinos(data.requestParams);
  data.loading = false;

  if (response && (response.code === 200 || response.code === 201)) {
    const dataResponse: ListarEjemplares = response.data

    data.catalog = [...dataResponse.datos];
    // totalPages.value = response.data.totalPages;
  } else {
    console.error("Error al obtener catálogo:", response?.msg);
  }

}

watch(() => data.requestParams, async () => {
  await cargarCatalogo()
}, { deep: true })

onMounted( async() => {
  await Promise.all([
    cargarCatalogo(),
    getCombobox()
  ])
});
</script>

<style scoped>
:deep(.v-list-item__prepend > .v-badge ~ .v-list-item__spacer),
:deep(.v-list-item__prepend > .v-icon ~ .v-list-item__spacer) {
  width: 0 !important;
}
</style>