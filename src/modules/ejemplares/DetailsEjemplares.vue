<template>
  <div class="w-100 py-4 ma-auto">
    <v-row density="compact">
      <v-col cols="12" md="2">
        <v-list nav color="indigo" v-model:selected="data.sideBarOpcSelected">
          <v-list-subheader class="font-weight-bold d-flex">
            Detalles Generales
          </v-list-subheader>
          <v-list-item v-for="(item, i) in data.sideBarOptions" :key="i"
           density="compact"
           rounded="lg"
           :value="item.label"
           :title="item.label"
           active-class="font-weight-bold"
           @click="
            setWindowOption(item.wind ?? 0);
            data.nameWind = item.label
           "
          >
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="10" class="border-s">
        <v-row>
          <v-col cols="12" md="4" sm="4"
             class="d-flex justify-center align-center"
          >
            <v-card
              height="100%"
              max-height="250"
              width="90%"
              class="rounded-xl overflow-hidden cursor-pointer"
              elevation="2"
            >
              <v-img
                :src="img"
                height="100%"
                width="100%"
                cover
                gradient="to bottom, rgba(0,0,0,0.5) 0%, transparent 40%, rgba(0,0,0,0.8) 100%"
              >
                <!-- Etiqueta sobre la imagen para mostrar el código del cerdo -->
                <div class="d-flex flex-column fill-height justify-space-between pa-4 text-white">
                  <div class="text-h6 font-weight-bold">
                    ID: {{ props.codigo }}
                  </div>
                  <div class="text-subtitle-1">
                    {{ data.ejemplarData.raza }}
                  </div>
                </div>

                <div class="position-absolute bottom-0 right-0 pa-4 text-white text-h5 font-weight-black">
                  <v-chip>
                    {{ data.ejemplarData.pesoActual ? '150 LBS' : '0 LBS' }}
                  </v-chip>
                </div>
              </v-img>
            </v-card>
          </v-col>

          <!-- Columna de los Detalles (Ficha Técnica) -->
          <v-col cols="12" md="8" sm="8">
            <v-container class="rounded-xl pa-5" elevation="5" height="100%">
              <div class="d-flex justify-space-between align-center mb-3">
                <div>
                  <h2 class="text-h4 font-weight-bold text-primary">{{ data.ejemplarData.nombre }}</h2>
                  <p class="text-subtitle-2 text-medium-emphasis mb-0">Origen: {{ data.ejemplarData.origen }}</p>
                </div>

                <div class="d-flex flex-wrap ga-2 align-center">
                  <v-chip
                    :color="data.ejemplarData.sexo === 'M' ? 'blue' : 'pink'"
                    variant="flat"
                    size="small"
                    class="mr-2"
                  >
                    <v-icon start icon="mdi-gender-male-female"></v-icon>
                    {{ data.ejemplarData.sexo }}
                  </v-chip>
                  <v-chip
                    :color="data.ejemplarData.estado ? 'success' : 'error'"
                    variant="flat"
                    size="small"
                  >
                    {{ data.ejemplarData.estado ? 'Activo' : 'Inactivo' }}
                  </v-chip>

                  <v-btn icon size="small" variant="text" @click="$router.go(-1)">
                    <v-icon>
                      mdi-undo
                    </v-icon>

                    <v-tooltip activator="parent" location="top center">
                      Volver
                    </v-tooltip>
                  </v-btn>
                </div>
              </div>

              <v-divider class="mb-4" />

              <div>
                <span>
                  Datos Generales
                </span>
              </div>

              <v-row density="compact">
                <!-- Sección 1: Fechas y Categoría -->
                <v-col cols="12" sm="6" md="4">
                  <div class="text-caption text-medium-emphasis">Tipo de Cerdo</div>
                  <div class="font-weight-medium">{{ data.ejemplarData.tipoCerdo }}</div>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <div class="text-caption text-medium-emphasis">Fecha Nacimiento</div>
                  <div class="font-weight-medium">{{ data.ejemplarData.fechaNacimiento }}</div>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <div class="text-caption text-medium-emphasis">Fecha Ingreso</div>
                  <div class="font-weight-medium">{{ data.ejemplarData.fechaIngreso }}</div>
                </v-col>
              </v-row>

              <div class="mt-4">
                <span>
                  Biometría y Reproducción
                </span>
              </div>
              <!-- Sección 2: Biometría y Reproducción -->
              <v-row>
                <v-col cols="12" sm="6" md="4" >
                  <div class="text-caption text-medium-emphasis">Pesos (Nac. / Actual)</div>
                  <div class="font-weight-medium">{{ data.ejemplarData.pesoNacimiento }} kg / <span class="text-primary">{{ data.ejemplarData.pesoActual }} kg</span></div>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <div class="text-caption text-medium-emphasis">N° Partos</div>
                  <div class="font-weight-medium">{{ data.ejemplarData.nPartos }}</div>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <div class="text-caption text-medium-emphasis">Cant. Pezones</div>
                  <div class="font-weight-medium">{{ data.ejemplarData.cantidadPesones }}</div>
                </v-col>
              </v-row>

              <div class="mt-4">
                <span>
                  Ubicación y Linaje
                </span>
              </div>

              <v-row>
                <!-- Sección 3: Ubicación y Linaje -->
                <v-col cols="12" sm="6" md="4">
                  <div class="text-caption text-medium-emphasis">Madre (ID)</div>
                  <div class="font-weight-medium">{{ data.ejemplarData.madre }}</div>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <div class="text-caption text-medium-emphasis">Lote / Etapa</div>
                  <div class="font-weight-medium">{{ data.ejemplarData.lote }} / {{ data.ejemplarData.etapaActual }}</div>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <div class="text-caption text-medium-emphasis">Corral Actual</div>
                  <v-chip size="small" variant="outlined" color="primary" class="mt-1">
                    {{ data.ejemplarData.corralActual }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>

        <v-divider />

        <v-window v-model="data.windValue">
          <v-window-item :value="0">
            <v-container class="d-flex justify-center align-center">
              <span>
                Seleccione una opcion
              </span>
            </v-container>
          </v-window-item>
          <v-window-item :value="1">
            <v-data-table
              :headers="data.headersAlimentacion"
              density="compact"
            >
              <template v-slot:top>
                <v-row density="compact" class="pa-4 d-flex justify-end align-center">
                  <v-col cols="6" md="6" sm="12">
                    <h2 class="my-0">
                      {{ data.nameWind }}
                    </h2>
                  </v-col>
                  <v-col cols="6" md="6" sm="12">
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

                <v-divider />
              </template>
            </v-data-table>
          </v-window-item>

          <v-window-item :value="2">
            <v-data-table
              :headers="data.headersPesaje"
              density="compact"
            >
              <template v-slot:top>
                <v-row density="compact" class="pa-4 d-flex justify-end align-center">
                  <v-col cols="6" md="6" sm="12" class="d-flex justify-start align-center">
                    <h2 class="my-0">
                      {{ data.nameWind }}
                    </h2>
                  </v-col>
                  <v-col cols="6" md="6" sm="12">
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

                <v-divider />
              </template>
            </v-data-table>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import RequestHttp from "../../services/requestHttp.ts";
import {onMounted, reactive} from "vue";
import img from "/imgs/pig.jpg";
// INSTANCES
const requestHttp = new RequestHttp();
type EjemplarType = {
  origen: string;
  codigo: string;
  nombre: string;
  fechaIngreso: string;
  fechaNacimiento: string;
  sexo: string;
  cantidadPesones: number;
  nPartos: number;
  pesoNacimiento: number;
  pesoActual: number;
  estado: boolean;
  tipoCerdo: string;
  raza: string;
  madre: string;
  padre: string;
  lote: string;
  corralActual: string;
  etapaActual: string;
  img: string;
}

// VARIABLES

const props = defineProps({
  codigo: {
    type: String,
    required: true
  }
})

const data = reactive({
  headersPesaje: [
    {title: '', key: 'opc', align: 'center', sortable: false,
      cellProps: {
        class: 'pa-0'
      }
    },
    {title: 'Head2', key: 'noFactura', align: 'center', sortable: false,
      cellProps: {
        class: 'font-weight-bold',
      }
    },
    {title: 'Head2', key: 'cliente', align: 'center', sortable: false},
    {title: 'Head3', key: 'objetivo', align: 'center'},
    {title: 'Head4', key: 'periodoDesde', align: 'center'},
    {title: 'Head5', key: 'periodoHasta', align: 'center'},
    {title: 'Head6', key: 'fechaVencimiento', align: 'center'},
    {title: 'Estado', key: 'estado', align: 'center', sortable: false}
  ],
  headersAlimentacion: [
    {title: '', key: 'opc', align: 'center', sortable: false,
      cellProps: {
        class: 'pa-0'
      }
    },
    {title: 'Head2', key: 'noFactura', align: 'center', sortable: false,
      cellProps: {
        class: 'font-weight-bold',
      }
    },
    {title: 'Head2', key: 'cliente', align: 'center', sortable: false},
    {title: 'Head3', key: 'objetivo', align: 'center'},
    {title: 'Head4', key: 'periodoDesde', align: 'center'},
    {title: 'Head5', key: 'periodoHasta', align: 'center'},
    {title: 'Head6', key: 'fechaVencimiento', align: 'center'},
    {title: 'Estado', key: 'estado', align: 'center', sortable: false}
  ],
  sideBarOpcSelected: ['General'],
  sideBarOptions: [{
    label: 'General',
    wind: 0
  }, {
    label: 'Alimentacion',
    wind: 1
  }, {
    label: 'Pesaje',
    wind: 2
  }],
  windValue: 0,
  nameWind: "",
  ejemplarData: {
    origen: "",
    codigo: "",
    nombre: "",
    fechaIngreso: "",
    fechaNacimiento: "",
    sexo: "",
    cantidadPesones: 0,
    nPartos: 0,
    pesoNacimiento: "",
    pesoActual: 0,
    estado: false,
    tipoCerdo: "",
    raza: "",
    madre: "",
    padre: "",
    lote: "",
    corralActual: "",
    etapaActual: "",
    img: "",
  }
})


// FUNCTIONS
onMounted(async () => {
  const result = await requestHttp.getEjemplarById(props.codigo)

  if (result !== null && result!.code === 200) {
    data.ejemplarData = result!.data
  } else {
    console.log(result)
  }
})

function setWindowOption(value: number) {
  data.windValue = value
}
</script>

<style scoped>

</style>