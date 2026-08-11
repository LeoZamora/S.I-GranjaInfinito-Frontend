<template>
  <div class="w-100 ma-auto">
    <v-row class="mt-4">
      <v-col>
        <v-data-table
          :headers="data.headers"
          :header-props="{class: 'font-weight-semibold'}"
          :items="data.items"
          :search="data.search"
          hover
          fixed-header
          :row-props="setStyle"
          :loading="data.loading"
          class="border-b border-t py-2"
          density="compact"
        >
          <template v-slot:top>
            <v-row density="compact" class="px-4">
              <v-col class="d-flex justify-start align-center">
                <h3 class="ma-0">
                  INSUMOS
                </h3>
              </v-col>
              <v-col class="d-flex justify-end align-center">
                <div class="d-flex">
                  <v-btn
                    variant="text"
                    class="border"
                    color="indigo-darken-4"
                    size="small"
                    icon
                    @click="data.showNewDialog = true"
                  >
                    <v-icon>
                      mdi-plus
                    </v-icon>

                    <v-tooltip activator="parent" location="top center">
                      Nuevo Insumo
                    </v-tooltip>
                  </v-btn>

                  <v-divider vertical class="mr-1 ml-2"></v-divider>
                </div>
              </v-col>
              <v-col class="d-flex justify-end align-center">
                <v-text-field
                  v-model="data.search"
                  label="Buscar"
                  variant="outlined"
                  density="compact"
                  rounded="xl"
                  hide-details
                  color="indigo-darken-4"
                  placeholder="Buscar"
                  persistent-placeholder
                  append-inner-icon="mdi-magnify"
                />
              </v-col>
            </v-row>

            <v-divider class="mt-2"/>
          </template>
          <template v-slot:bottom>
            <v-row>
              <v-col class="d-flex justify-end align-center">
                <v-pagination
                  v-model="data.requestParams.paginacion.pagina"
                  :length="totalPages"
                  show-first-last-page
                  :total-visible="5"
                  color="indigo-darken-4"
                  rounded="circle"
                  density="compact"
                  variant="plain"
                  @update:model-value="cargarInsumos"
                ></v-pagination>
              </v-col>
            </v-row>
          </template>

          <template v-slot:loader>
            <v-progress-linear color="indigo" height="2" indeterminate/>
          </template>
          <template v-slot:loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
          </template>

          <template v-slot:item.opc="{ item }">
            <v-menu v-model="item.show" :close-on-content-click="false" location="right center" origin="auto">
              <template v-slot:activator="{ props }">
                <v-tooltip text="Opciones" location="top">
                  <template v-slot:activator="{ props: tooltipProps }">
                    <v-btn
                      icon
                      variant="text"
                      color="grey-darken-1"
                      v-bind="{ ...props, ...tooltipProps }"
                      class="hover-scale"
                    >
                      <v-icon size="22">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
              </template>

              <v-card rounded="lg" elevation="6" min-width="160" class="pa-1">
                <v-list density="compact" class="py-1" nav>
                  <v-list-item-subtitle>
                    Opciones
                  </v-list-item-subtitle>
                  <v-list-item rounded density="compact" append-icon="mdi-eye-outline"
                   title="Ver"
                   color="green"
                   @click="data.idProducto = item.idProducto;
                      data.showNewDialog = true;
                      data.viewProducto = true;"
                  />

                  <v-list-item
                    rounded
                    density="compact"
                    append-icon="mdi-pencil-outline"
                    title="Editar"
                    color="indigo"
                    @click="editProducto(item.idProducto)"
                  />
                </v-list>
              </v-card>
            </v-menu>
          </template>

          <template v-slot:item.createdAt="{ item }">
            {{ formateDate(item.createdAt) }}
          </template>
          <template v-slot:item.updatedAt="{ item }">
            {{ formateDate(item.updatedAt) }}
          </template>

          <template v-slot:item.precio="{ item }">
            <div class="font-weight-semibold">
              {{ formatCurrency(item.precio) }}
            </div>
          </template>

          <template v-slot:item.costo="{ item }">
            <div class="font-weight-semibold">
              {{ formatCurrency(item.costo) }}
            </div>
          </template>

          <template v-slot:item.estado="{ item }">
            <v-chip
              :color="item.estado ? 'green' : 'error'"
            >
              {{ item.estado ? 'Activo' : 'Inactivo' }}
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <CreateInsumo
      :show="data.showNewDialog"
      :idProducto="data.idProducto"
      :edit="data.isEdit"
      :view="data.viewProducto"
      @close="closeDialogNewInsumo"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import CreateInsumo from "@/modules/insumos/CreateInsumo.vue";
// @ts-ignore
import type {insumosPagination, Producto, ListarPagination} from "@/common/types/apiTypes.ts";
// import {endPoints} from "@/api/endPoints.ts";
// import useRouter from "vue-router";
// @ts-ignore
import RequestHttp from "@/services/requestHttp.ts";
// @ts-ignore
import {formatCurrency, formateDate} from "@/common/utils/formatters.ts";
import {VDataTable} from "vuetify/components";
// const router = useRouter();
const requestHttp = new RequestHttp();

// @ts-ignore
type DataTableHeaders = InstanceType<typeof VDataTable>['headers'];

const data = reactive({
  requestParams: {
    paginacion: {
      pagina: 1,
      porPagina: 6,
      ordenarPor: 'createdAt',
      ordenarDir: 'DESC',
    },
    filtros: {
      busqueda: null,
      idSubCatProd: null,
      idTipoProducto: null
    }
  } as insumosPagination,
  items: [] as Producto[],
  headers: [
    { title: '', key: 'opc', align: 'center' },
    { title: 'Código', key: 'codigo', align: 'center' },
    { title: 'Nombre', key: 'nombre', align: 'center' },
    { title: 'Precio', key: 'precio', align: 'end' },
    { title: 'Costo', key: 'costo', align: 'end' },
    { title: 'Cantidad', key: 'cantidadTotal', align: 'center' },
    { title: 'Cant. Mín', key: 'cantidadMinima', align: 'center' },
    { title: 'Creado', key: 'createdAt', align: 'center' },
    { title: 'Actualizado', key: 'updatedAt', align: 'center' },
    { title: 'Creado', key: 'createdBy', align: 'center' },
    { title: 'Actualizado', key: 'updatedBy', align: 'center' },

    { title: 'Estado', key: 'estado', align: 'center' },
  ] as DataTableHeaders,
  showNewDialog: false,
  loading: false,
  isEdit: false,
  idProducto: 0,
  viewProducto: false,
  search: ''
})


const totalPages = ref(5);

async function cargarInsumos() {
  data.loading = true
  const response = await requestHttp.getInsumos(data.requestParams);
  data.loading = false;

  if (response && (response.code === 200 || response.code === 201)) {
    const dataResponse: ListarPagination = response.data

    data.items = [...dataResponse.datos];
    // totalPages.value = response.data.totalPages;
  } else {
    console.error("Error al obtener catálogo:", response?.msg);
  }

}

// @ts-ignore
function setStyle({index}) {
  return {
    class: index % 2 === 0 ? 'bg-white' : 'bg-indigo-lighten-5',
  };
}

function editProducto(id: number) {
  console.log(id)
  data.showNewDialog = true;
  data.isEdit = true;
  data.idProducto = id
}

async function closeDialogNewInsumo(val: boolean) {
  data.showNewDialog = val;
  data.isEdit = false;
  data.idProducto = 0
  data.viewProducto = false;

  await cargarInsumos();
}

watch(() => data.requestParams, async () => {
  await cargarInsumos()
}, { deep: true })

onMounted( async() => {
  await Promise.all([
    cargarInsumos(),
  ])
});
</script>

<style scoped>

</style>