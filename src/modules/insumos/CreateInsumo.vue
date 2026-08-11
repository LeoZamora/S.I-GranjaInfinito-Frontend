<template>
  <v-dialog v-model="dialog" max-width="1000" persistent scrollable>
    <v-card class="rounded-xl" elevation="4">
      <v-card-title class="d-flex justify-space-between align-center px-4 py-2 border-b bg-indigo-darken-4 text-white">
        <div class="text-h6 font-weight-bold d-flex align-center">
          <v-icon class="mr-2">mdi-package-variant-closed</v-icon>
          Registro de Producto / Insumo
        </div>
        <v-btn icon="mdi-close" variant="tonal" density="comfortable" color="white" @click="cerrarDialogo"></v-btn>
      </v-card-title>

      <v-card-text class="pa-4 pa-md-6 custom-scrollbar">
        <v-form ref="formRef">
          <v-row density="comfortable" class="align-stretch">

            <v-col cols="12" md="4" class="d-flex flex-column align-center">
              <v-card
                  height="280"
                  width="100%"
                  class="rounded-xl overflow-hidden cursor-pointer position-relative border mb-4"
                  elevation="2"
                  @click="triggerFileUpload"
              >
                <v-img :src="imagePreview" height="100%" width="100%" cover>
                  <template v-slot:placeholder>
                    <div class="d-flex flex-column align-center justify-center fill-height bg-grey-lighten-4">
                      <v-icon size="48" color="grey-darken-1" class="mb-2">mdi-camera-plus-outline</v-icon>
                      <span class="text-grey-darken-1 text-caption">Subir foto</span>
                    </div>
                  </template>
                </v-img>
              </v-card>

              <input
                  type="file"
                  ref="fileInput"
                  accept="image/jpeg, image/png, image/webp"
                  style="display: none"
                  @change="onFileSelected"
              />

              <v-card class="w-100 rounded-xl border pa-3 d-flex justify-space-between align-center" elevation="0">
                <span class="text-subtitle-2 font-weight-bold text-medium-emphasis">Estado del Insumo:</span>
                <v-switch
                    :readonly="props.view"
                    v-model="formData.estado"
                    :label="formData.estado ? 'Activo' : 'Inactivo'"
                    color="success"
                    hide-details
                    density="compact"
                    class="font-weight-bold"
                />
              </v-card>
            </v-col>

            <v-col cols="12" md="8">
              <div class="mb-4">
                <h4 class="text-subtitle-1 font-weight-bold text-indigo-darken-4 mb-2 mt-0 d-flex align-center">
                  <v-icon size="small" class="mr-2">mdi-information-outline</v-icon> Información General
                </h4>
                <v-row density="compact">
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="formData.codigo" label="Código" prepend-inner-icon="mdi-barcode" :readonly="props.view" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" hide-details="auto" :rules="data.rule" />
                  </v-col>
                  <v-col cols="12" sm="8">
                    <v-text-field v-model="formData.nombre" label="Nombre del Producto" prepend-inner-icon="mdi-tag-text-outline" color="indigo-darken-4" variant="outlined" :readonly="props.view" density="comfortable" rounded="xl" hide-details="auto" :rules="data.rule" />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-autocomplete :clearable="!props.view" v-model="formData.idTipoProducto" :items="data.tipoProducto" :readonly="props.view" item-title="nombre" item-value="id" label="Tipo de Producto" prepend-inner-icon="mdi-shape-outline" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" hide-details="auto" :rules="data.rule" />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-autocomplete :clearable="!props.view" v-model="data.idCategoria" :items="data.categorias" item-title="nombre" item-value="id" label="Categoria" :readonly="props.view" prepend-inner-icon="mdi-shape-plus-outline" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" hide-details="auto" :rules="data.rule"  @update:model-value="getSubCategorias()"/>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-autocomplete :clearable="!props.view" v-model="formData.idSubCatProd" :items="data.subcategorias" item-title="nombre" item-value="id" :readonly="props.view" label="Subcategoría" prepend-inner-icon="mdi-shape-plus-outline" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" hide-details="auto" :rules="data.rule" />
                  </v-col>
                </v-row>
              </div>

              <div class="mb-4">
                <h4 class="text-subtitle-1 font-weight-bold text-indigo-darken-4 mb-2 d-flex align-center">
                  <v-icon size="small" class="mr-2">mdi-finance</v-icon> Precios e Inventario
                </h4>
                <v-row density="compact">
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field v-model="formData.costo" type="number" step="0.01" label="Costo" :readonly="props.view" prepend-inner-icon="mdi-currency-usd" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" hide-details="auto" :rules="data.rule"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field v-model="formData.precio" type="number" step="0.01" label="Precio Venta" :readonly="props.view" prepend-inner-icon="mdi-cash-multiple" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" hide-details="auto" :rules="data.rule"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field v-model="formData.cantidadTotal" type="number" step="0.01" label="Stock Total" prepend-inner-icon="mdi-warehouse" :readonly="props.view" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" hide-details="auto" :rules="data.rule"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field v-model="formData.cantidadMinima" type="number" step="0.01" label="Stock Mínimo" prepend-inner-icon="mdi-alert-box-outline" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" hide-details="auto"  :readonly="props.view"/>
                  </v-col>
                </v-row>
              </div>

              <div class="mb-4">
                <h4 class="text-subtitle-1 font-weight-bold text-indigo-darken-4 mb-2 d-flex align-center">
                  <v-icon size="small" class="mr-2">mdi-scale-balance</v-icon> Unidades de Medida (UM)
                </h4>
                <v-card class="bg-grey-lighten-4 rounded-lg pa-3 border" elevation="0">
                  <v-row density="compact">
                    <v-col cols="12" sm="6">
                      <v-autocomplete :clearable="!props.view" v-model="formData.idUnidadMedidaCompra" :items="data.unidadesMedidas" item-title="nombre" item-value="id" label="UM de Compra" prepend-inner-icon="mdi-cart-arrow-down" color="indigo-darken-4" variant="outlined" density="compact" rounded="xl" bg-color="white" hide-details="auto" :rules="data.rule" :readonly="props.view"/>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="formData.cantidadUmCompra" type="number" step="0.01" label="Cantidad por UM Compra" prepend-inner-icon="mdi-numeric" color="indigo-darken-4" variant="outlined" density="compact" bg-color="white" hide-details="auto" rounded="xl" :rules="data.rule" :readonly="props.view"/>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-autocomplete :clearable="!props.view" v-model="formData.idUnidadMedidaVenta" :items="data.unidadesMedidas" item-title="nombre" item-value="id" label="UM de Venta" prepend-inner-icon="mdi-cart-arrow-up" color="indigo-darken-4" variant="outlined" density="compact" bg-color="white" hide-details="auto" rounded="xl" :rules="data.rule" :readonly="props.view"/>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="formData.cantidadUmVenta" type="number" step="0.01" label="Cantidad por UM Venta" prepend-inner-icon="mdi-numeric" color="indigo-darken-4" variant="outlined" density="compact" bg-color="white" hide-details="auto" rounded="xl" :rules="data.rule" :readonly="props.view"/>
                    </v-col>
                  </v-row>
                </v-card>
              </div>

              <div>
                <v-textarea v-model="formData.observaciones" label="Observaciones Adicionales" prepend-inner-icon="mdi-comment-text-outline" color="indigo-darken-4" variant="outlined" density="comfortable" rows="2" rounded="xl" hide-details="auto" auto-grow />
              </div>

            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-4 border-t d-flex justify-end">
        <v-btn variant="text" color="grey-darken-3" rounded="lg"  @click="cerrarDialogo">
          Cancelar
        </v-btn>
        <v-btn v-if="!props.view" variant="flat" color="indigo-darken-4" rounded="lg" prepend-icon="mdi-content-save-check" class="px-6" @click="saveInsumo()">
          Guardar
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>

  <OverlayComp
    :show="data.overlay.show"
    :msg="data.overlay.msg"
    :success="data.overlay.success"
    :error="data.overlay.error"
  />
</template>

<script setup lang="ts">
import {ref, reactive, watch} from 'vue';
import OverlayComp from "@/reusable/OverlayComp.vue";
// @ts-ignore
import RequestHttp from "@/services/requestHttp.ts";
// @ts-ignore
import {endPoints} from "@/api/endPoints.ts";
// @ts-ignore
import type {ItemsCombobox} from "@/common/types/apiTypes.ts";

const requestHttp = new RequestHttp();

const dialog = ref(false);
const formRef = ref(null);

// PROPS
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  idProducto: {
    type: Number,
    required: false,
  },
  edit: {
    type: Boolean,
    required: true,
  },
  view: {
    type: Boolean,
    required: true,
  }
})

// EMITS
const emit = defineEmits<{
  (e: 'close', val: boolean): void;
  (e: 'guardado', data: any): void;
}>();

watch(() => props.show, async (val) => {
  dialog.value = val;

  if (val) {
    await getCombobox()

    if (props.idProducto) {
      await getProductoById(props.idProducto)
    }
    // if (props.edit) {
    // }
  }
})

// watch(() => props.idProducto, async (val) => {
//   if (val && val > 0) {
//
//   }
// })

let formData = reactive({
  codigo: "",
  nombre: "",
  cantidadUmVenta: "",
  cantidadUmCompra: null as number | null,
  precio: "",
  costo: "",
  cantidadTotal: "",
  cantidadMinima: "",
  imgUrl: "",
  observaciones: "",
  estado: true,
  idSubCatProd: null as number | null,
  idTipoProducto: null as number | null,
  idUnidadMedidaCompra: null as number | null,
  idUnidadMedidaVenta: null as number | null
});

const data = reactive({
  rule: [(v: any) => !!v || 'El campo es obligatorio'],
  idCategoria: null,
  overlay: {
    show: false,
    msg: 'Creando registro',
    success: false,
    error: false,
  },
  categorias: [] as ItemsCombobox,
  subcategorias: [] as ItemsCombobox[],
  unidadesMedidas: [] as ItemsCombobox[],
  tipoProducto: [] as ItemsCombobox[],
})


const defaultImageUrl = '';
const fileInput = ref(null);
const imagePreview = ref(defaultImageUrl);
const selectedFile = ref(null);

const triggerFileUpload = () => {
  if (fileInput.value) {
    //@ts-ignore
    fileInput.value.click();
  }
};

const onFileSelected = (event: any) => {
  const file = event.target.files[0];
  if (!file) return;

  selectedFile.value = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    // @ts-ignore
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const cerrarDialogo = () => {
  dialog.value = false;
  // @ts-ignore
  formRef.value?.reset();
  imagePreview.value = "";

  emit('close', false)
};


async function getCombobox () {
  try {
    const [
      categorias,
      unidadesMedidas,
      tiposProd,
    ] = await Promise.all([
      requestHttp.getItemsCombobox(endPoints.getCategoriaProdCbx),
      requestHttp.getItemsCombobox(endPoints.getUnidadesMedCbx),
      requestHttp.getItemsCombobox(endPoints.getTipoProdCbx),
    ])

    data.categorias = categorias.data
    data.unidadesMedidas = unidadesMedidas.data
    data.tipoProducto = tiposProd.data
  } catch (e) {
    console.log(e)
  }
}

async function getSubCategorias () {
  data.subcategorias = []
  const response: {
    code: number,
    data: any,
    msg: string | null
  } = await requestHttp.getSubCategorias(data.idCategoria);

  if (response.code === 200 || response.code === 201) {
    data.subcategorias = response.data
  } else {
    console.error(response)
  }
}

async function getProductoById(id: number) {
  data.overlay.show = true
  data.overlay.msg = 'Cargando...'
  const response = await requestHttp.getProductoById(id)

  console.log(response)

  if (response.code === 200 || response.code === 201) {
    Object.assign(formData, response.data)
    data.idCategoria = response.data.idCatProducto
    await getSubCategorias()
    data.overlay.show = false
    data.overlay.msg = ''
    imagePreview.value = response.data.imgUrl
  } else {
    data.overlay.error = true
    data.overlay.msg = `${response.msg || 'No se pudo cargar los datos'}`
    return setTimeout(() => {
      data.overlay.error = false
      data.overlay.show = false

      cerrarDialogo()
    }, 3000)
  }
}

async function saveInsumo() {
  //@ts-ignore
  const valid = await formRef?.value.validate()

  if (!valid.valid) return

  data.overlay.show = true
  data.overlay.msg = !props.edit ? 'Creando registro' : 'Editando registro'
  const response: {
    code: number,
    data: any,
    msg: any
  } = !props.edit ? await requestHttp.postProducto({...formData, cantidadUmCompra: Number(formData.cantidadUmCompra)}) : await requestHttp.putProducto(formData, props.idProducto)

  if(response.code === 200 || response.code === 201) {
    if (selectedFile.value && !props.edit) {
      const formData = new FormData();
      // @ts-ignore
      formData.append('foto', selectedFile.value);

      data.overlay.msg = 'Registrando imagen'
      const responseImg = await requestHttp.postImgProducto(formData, response.data.datos.idProducto || 0)

      if (responseImg.code === 200 || responseImg.code === 201) {
        data.overlay.msg = 'Imagen registrada'
        setTimeout(() => {
          data.overlay.msg = ''
        }, 1500)
      } else {
        data.overlay.error = true
        data.overlay.msg = 'No se pudo registrar la imagen'
        setTimeout(() => {
          data.overlay.error = false
          data.overlay.msg = ''
        }, 2000)
      }
    }

    // @ts-ignore
    formRef?.value.reset()
    imagePreview.value = ''

    data.overlay.success = true
    data.overlay.msg = !props.edit ? 'Registro completado' : 'Registro editado'
    return setTimeout(() => {
      data.overlay.success = false
      data.overlay.show = false

      cerrarDialogo()
    }, 2500)

  } else {
    data.overlay.error = true
    data.overlay.msg = `${response.msg}`
    return setTimeout(() => {
      data.overlay.error = false
      data.overlay.show = false
    }, 3000)
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>