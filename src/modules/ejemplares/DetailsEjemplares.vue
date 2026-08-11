<template>
  <div class="w-100 py-4 ma-auto">
    <v-row density="comfortable">
      <v-col cols="12" md="12" class="">
        <v-row density="comfortable">
          <v-col cols="12" md="4" sm="12" class="d-flex flex-column justify-center">
            <v-card
              height="100%"
              max-height="250"
              width="100%"
              class="rounded-xl overflow-hidden mt-2 mx-2"
              elevation="2"
            >
              <v-img
                  :src="data.ejemplarData.imgUrl"
                  height="100%"
                  width="100%"
                  cover
                  gradient="to bottom, rgba(0,0,0,0.6) 0%, transparent 40%, rgba(17, 24, 39, 0.2) 100%"
              >
                <div class="d-flex flex-column fill-height justify-space-between pa-4 text-white">
                  <!-- Superior: ID y Raza -->
                  <div>
                    <div class="d-flex justify-space-between align-center">
                      <v-chip color="indigo-lighten-1" size="small" variant="flat" class="font-weight-bold mb-1">
                        <v-icon start size="small">mdi-barcode</v-icon>
                        ID: {{ data.ejemplarData.codigo }}
                      </v-chip>

                      <v-chip color="white" variant="outlined" class="font-weight-black backdrop-blur bg-black-20">
                        {{ data.ejemplarData.origen || 'N/A' }}
                      </v-chip>
                    </div>
                    <div class="text-subtitle-1 font-weight-bold text-grey-lighten-2">
                      <v-icon size="small" class="mr-1">mdi-dna</v-icon>
                      <!-- Nota: asumo que mapeas idRaza al nombre de la raza -->
                      {{ data.ejemplarData.raza || 'Raza no especificada' }}
                    </div>
                  </div>

                  <!-- Inferior: Peso -->
                  <div class="d-flex justify-end">
                    <v-chip color="white" variant="outlined" class="font-weight-black backdrop-blur bg-black-20">
                      <v-icon start>mdi-scale-bathroom</v-icon>
                      {{ data.ejemplarData.pesoActual || 'N/A' }} LBS
                    </v-chip>
                  </div>
                </div>
              </v-img>
            </v-card>

            <v-list nav color="indigo" v-model:selected="data.sideBarOpcSelected">
              <v-list-subheader class="font-weight-bold d-flex text-uppercase">
                Detalles Generales
              </v-list-subheader>
              <v-divider />
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

          <v-col cols="12" md="8" sm="12" class="px-4">
            <div class="d-flex justify-space-between align-center flex-wrap mb-4">
              <div>
                <h2 class="text-h4 font-weight-bold  mb-1">
                  {{ data.ejemplarData.nombre }}
                </h2>
              </div>

              <div class="d-flex flex-wrap ga-2 align-center mt-2 mt-sm-0">
                <v-chip
                    :color="data.ejemplarData.sexo?.toLowerCase().startsWith('m') ? 'blue-darken-1' : 'pink-lighten-1'"
                    variant="flat"
                    size="small"
                    class="font-weight-bold"
                >
                  <v-icon start :icon="data.ejemplarData.sexo?.toLowerCase().startsWith('m') ? 'mdi-gender-male' : 'mdi-gender-female'"></v-icon>
                  {{ data.ejemplarData.sexo?.toLowerCase().startsWith('m') ? 'Macho' : 'Hembra' }}
                </v-chip>

                <v-chip
                    :color="data.ejemplarData.estado ? 'success' : 'error'"
                    variant="flat"
                    size="small"
                    class="font-weight-bold"
                >
                  <v-icon start>{{ data.ejemplarData.estado ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
                  {{ data.ejemplarData.estado ? 'Activo' : 'Inactivo' }}
                </v-chip>

                <v-btn icon size="small" variant="text" color="grey-darken-2" class="ml-2" @click="$router.go(-1)">
                  <v-icon>mdi-undo</v-icon>
                  <v-tooltip activator="parent" location="top">
                    Volver
                  </v-tooltip>
                </v-btn>
              </div>
            </div>

            <v-divider class="mb-5" />

            <h3 class="text-subtitle-1 font-weight-bold  mb-3 d-flex align-center">
              <v-icon class="mr-2" size="small">mdi-information-outline</v-icon>
              Datos Generales
            </h3>
            <v-row density="comfortable" class="mb-4">
              <v-col cols="12" sm="6" md="4">
                <div class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-pig</v-icon> Tipo de Cerdo
                </div>
                <div class="font-weight-medium text-body-1">{{ data.ejemplarData.tipoCerdo || 'N/A' }}</div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-cake-variant-outline</v-icon> Fecha Nacimiento
                </div>
                <div class="font-weight-medium text-body-1">{{ formateDate(data.ejemplarData.fechaNacimiento) }}</div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-calendar-import</v-icon> Fecha Ingreso
                </div>
                <div class="font-weight-medium text-body-1">{{ formateDate(data.ejemplarData.fechaIngreso) }}</div>
              </v-col>
            </v-row>

            <h3 class="text-subtitle-1 font-weight-bold  mb-3 mt-2 d-flex align-center">
              <v-icon class="mr-2" size="small">mdi-heart-pulse</v-icon>
              Biometría y Reproducción
            </h3>
            <v-row density="compact" class="mb-4">
              <v-col cols="12" sm="6" md="4">
                <div class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-weight</v-icon> Pesos (Nac. / Actual)
                </div>
                <div class="font-weight-medium text-body-1">
                  {{ data.ejemplarData.pesoNacimiento || '0' }} lbs /
                  <span class=" font-weight-bold">{{ data.ejemplarData.pesoActual || '0' }} lbs</span>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-baby-buggy</v-icon> N° Partos
                </div>
                <div class="font-weight-medium text-body-1">{{ data.ejemplarData.nPartos || "0" }}</div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-dots-grid</v-icon> Cant. Pezones
                </div>
                <div class="font-weight-medium text-body-1">{{ data.ejemplarData.cantidadPezones || "N/A" }}</div>
              </v-col>
              <v-col cols="12">
                <div class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-clipboard-text-outline</v-icon> Características Físicas
                </div>
                <div class="text-body-2 font-italic text-grey-darken-2">
                  {{ data.ejemplarData.caracteristicas || "Sin características registradas." }}
                </div>
              </v-col>
            </v-row>

            <h3 class="text-subtitle-1 font-weight-bold  mb-3 mt-2 d-flex align-center">
              <v-icon class="mr-2" size="small">mdi-map-marker-path</v-icon>
              Ubicación y Linaje
            </h3>
            <v-row density="compact">
              <v-col cols="12" sm="6" md="3">
                <div class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-gender-female</v-icon> Madre (ID)
                </div>
                <div class="font-weight-medium text-body-1">{{ data.ejemplarData.madre || 'N/A' }}</div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-gender-male</v-icon> Padre (ID)
                </div>
                <div class="font-weight-medium text-body-1">{{ data.ejemplarData.padre || 'N/A' }}</div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-format-list-group</v-icon> Lote / Etapa
                </div>
                <div class="font-weight-medium text-body-1 text-truncate">
                  {{ data.ejemplarData.lote }} / {{ data.ejemplarData.etapa }}
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="text-caption text-medium-emphasis d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-fence</v-icon> Corral Actual
                </div>
                <v-chip size="small" variant="tonal" color="indigo-darken-4" class="mt-1 font-weight-bold">
                  {{ data.ejemplarData.corral || 'No asignado' }}
                </v-chip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-divider class="mt-5" />

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

    <OverlayComp
      :show="data.overlay.show"
      :msg="data.overlay.msg"
      :success="data.overlay.success"
      :error="data.overlay.error"
    />
  </div>
</template>

<script setup lang="ts">
import RequestHttp from "../../services/requestHttp.ts";
import {reactive, watch} from "vue";
// @ts-ignore
import {formateDate} from "@/common/utils/formatters.ts";
// @ts-ignore
import type {Ejemplar, ItemsCombobox} from "@/common/types/apiTypes.ts";
// @ts-ignore
import {endPoints} from "@/api/endPoints.ts";
import OverlayComp from "@/reusable/OverlayComp.vue";
import {VDataTable} from "vuetify/components";

// VARIABLES
const requestHttp = new RequestHttp();
// @ts-ignore
type DataTableHeaders = InstanceType<typeof VDataTable>['headers'];

const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  }
})

const data = reactive({
  overlay: {
    show: false,
    msg: 'Cargando...',
    success: false,
    error: false,
  },
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
  ] as DataTableHeaders,
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
  ] as DataTableHeaders,
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
  ejemplarData: {} as Ejemplar,
  razas: [] as ItemsCombobox[],
  tiposCerdo: [] as ItemsCombobox[],
  etapas: [] as ItemsCombobox[],
  corrales: [] as ItemsCombobox[],
  lotes: [] as ItemsCombobox[],
  parents: [] as ItemsCombobox[],
})


// FUNCTIONS
async function getCombobox () {
  try {
    const [
      razas,
      lotes,
      tiposCerdos,
      corrales,
      etapas,
      padres,
    ] = await Promise.all([
      requestHttp.getItemsCombobox(endPoints.getRazasCbx),
      requestHttp.getItemsCombobox(endPoints.getLotesCbx),
      requestHttp.getItemsCombobox(endPoints.getTiposCerdosCbx),
      requestHttp.getItemsCombobox(endPoints.getCorralesCbx),
      requestHttp.getItemsCombobox(endPoints.getEtapasCbx),
      requestHttp.getItemsCombobox(endPoints.getPorcinosCbx),
    ])

    data.razas = razas?.data
    data.lotes = lotes?.data
    data.tiposCerdo = tiposCerdos?.data
    data.corrales = corrales?.data
    data.etapas = etapas?.data
    data.parents = padres?.data
  } catch (e) {
    console.log(e)
  }
}

const cargarInformacion = async (idCerdo: number | string) => {
  data.overlay.show = true
  data.overlay.msg = 'Cargando datos...'
  await getCombobox();

  const result = await requestHttp.getEjemplarById(Number(idCerdo));

  if (result && result.code === 200) {
    data.ejemplarData = result.data as Ejemplar & {
      tipoCerdo: string;
      corral: string;
      padre: string;
      madre: string;
      lote: string;
      etapa: string;
      raza: string;
    };

    data.ejemplarData.tipoCerdo = data.tiposCerdo.find((item: ItemsCombobox) => item.id === data.ejemplarData.idTipoCerdo)?.nombre || 'N/A';

    data.ejemplarData.corral = data.corrales.find((item: ItemsCombobox) => item.id === data.ejemplarData.idCorralActual)?.nombre || 'N/A';

    data.ejemplarData.padre = data.parents.find((item: ItemsCombobox) => item.id === data.ejemplarData.idPadre)?.nombre || 'Desconocido';

    data.ejemplarData.madre = data.parents.find((item: ItemsCombobox) => item.id === data.ejemplarData.idMadre)?.nombre || 'Desconocida';

    data.ejemplarData.lote = data.lotes.find((item: ItemsCombobox) => item.id === data.ejemplarData.idLote)?.nombre || 'Sin lote';

    data.ejemplarData.etapa = data.etapas.find((item: ItemsCombobox) => item.id === data.ejemplarData.idEtapaPorcinoActual)?.nombre || 'N/A';

    data.ejemplarData.raza = data.razas.find((item: ItemsCombobox) => item.id === data.ejemplarData.idRaza)?.nombre || 'N/A';

    data.overlay.show = false
  } else {
    data.overlay.show = false
    console.error("Error al cargar la información:", result);
  }
};

watch(
    () => props.id,
    async (nuevoId) => {
      if (nuevoId) {
        await cargarInformacion(nuevoId);
      }
    },
    { immediate: true }
);

function setWindowOption(value: number) {
  data.windValue = value
}
</script>

<style scoped>

</style>