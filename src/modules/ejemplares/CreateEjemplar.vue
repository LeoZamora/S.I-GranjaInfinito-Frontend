<template>
  <div class="w-100 ma-auto">
    <div class="d-flex justify-space-between align-center px-4">
      <div>
        <h2 class="my-2">Nuevo Ejemplar</h2>
      </div>
      <div>
        <v-btn icon size="small" variant="text" @click="$router.go(-1); resetForm()">
          <v-icon>
            mdi-undo
          </v-icon>

          <v-tooltip activator="parent" location="top center">
            Volver
          </v-tooltip>
        </v-btn>
      </div>
    </div>

    <v-divider />

    <v-form ref="refForm">
      <v-container class="pa-0">
        <v-row density="compact">
          <v-col cols="12" md="4" lg="4" sm="12" class="d-flex justify-center align-center">
            <v-card
                height="100%"
                max-height="250"
                width="90%"
                class="rounded-xl overflow-hidden cursor-pointer position-relative"
                elevation="2"
                @click="triggerFileUpload"
            >
              <v-img
                  :src="imagePreview"
                  height="100%"
                  width="100%"
                  cover
              >
                <template v-slot:placeholder>
                  <div class="d-flex flex-column align-center justify-center fill-height bg-grey-lighten-4">
                    <v-icon size="48" color="grey-darken-1" class="mb-2">mdi-camera-plus-outline</v-icon>
                    <span class="text-grey-darken-1 text-caption">Subir foto</span>
                  </div>
                </template>
              </v-img>

              <div class="upload-overlay d-flex align-center justify-center">
                <span class="text-white text-subtitle-1">Cambiar Imagen</span>
              </div>
            </v-card>

            <input
                type="file"
                ref="fileInput"
                accept="image/jpeg, image/png, image/webp"
                style="display: none"
                @change="onFileSelected"
            />
          </v-col>

          <!-- Formulario -->
          <v-col cols="12" md="8" sm="12" class="d-flex justify-center align-center">
            <v-row density="comfortable" class="py-2 px-4">
              <v-col cols="12" md="12" sm="12">
                <v-window v-model="data.wind">

                  <!-- VENTANA 1: Información General -->
                  <v-window-item :value="1">
                    <v-row>
                      <v-col cols="12" class="d-flex justify-space-between align-center">
                        <h3 class="text-subtitle-1 font-weight-bold mb-2 mt-2 text-indigo-darken-4 d-flex align-center">
                          <v-icon class="mr-2" size="small">mdi-information-outline</v-icon>
                          Información General
                        </h3>
                      </v-col>

                      <v-col cols="12" md="6" sm="6">
                        <v-row density="comfortable">
                          <v-col cols="12" md="12" sm="12">
                            <v-text-field v-model="data.formulario.codigo" label="Código" prepend-inner-icon="mdi-barcode" color="indigo-darken-4" variant="outlined" hide-details density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-date-input v-model="data.formulario.fechaNacimiento" prepend-icon="" prepend-inner-icon="mdi-cake-variant-outline" color="indigo-darken-4" label="Fecha de Nacimiento" variant="outlined" hide-details density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-text-field v-model="data.formulario.nombre" label="Nombre" prepend-inner-icon="mdi-tag-text-outline" color="indigo-darken-4" variant="outlined" density="comfortable" hide-details rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.sexo" :items="['Macho', 'Hembra']" label="Sexo" prepend-inner-icon="mdi-gender-male-female" color="indigo-darken-4" variant="outlined" density="comfortable" hide-details rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-text-field v-model="data.formulario.origen" label="Origen (Granja, Compra, etc.)" prepend-inner-icon="mdi-truck-outline" color="indigo-darken-4" hide-details variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" md="6" sm="6">
                        <v-row density="comfortable">
                          <v-col cols="12" md="12" sm="12" class="d-flex justify-end align-center">
                            <v-switch v-model="data.formulario.estado" :label="data.formulario.estado ? 'Activo' : 'Inactivo'" color="success" hide-details rounded="xl" :rules="data.rules.rule" hide-spin-buttons density="compact" class="mb-2"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-date-input v-model="data.formulario.fechaIngreso" prepend-icon="" prepend-inner-icon="mdi-calendar-import" color="indigo-darken-4" label="Fecha de Ingreso" hide-details variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idRaza" :items="data.razas" item-title="nombre" item-value="id" label="Raza" prepend-inner-icon="mdi-dna" color="indigo-darken-4" variant="outlined" density="comfortable" hide-details rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idTipoCerdo" :items="data.tiposCerdo" item-title="nombre" item-value="id" label="Tipo de Cerdo" prepend-inner-icon="mdi-pig" color="indigo-darken-4" variant="outlined" density="comfortable" hide-details rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idEtapaPorcinoActual" :items="data.etapas" item-title="nombre" item-value="id" label="Etapa Actual" prepend-inner-icon="mdi-chart-timeline-variant" color="indigo-darken-4" variant="outlined" density="comfortable" hide-details rounded="xl" :rules="data.rules.rule"/>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-window-item>

                  <!-- VENTANA 2: Ubicación y Genealogía -->
                  <v-window-item :value="2">
                    <v-row density="comfortable">
                      <v-col cols="12">
                        <h3 class="text-subtitle-1 font-weight-bold mt-2 mb-2 text-indigo-darken-4 d-flex align-center">
                          <v-icon class="mr-2" size="small">mdi-map-marker-path</v-icon>
                          Ubicación y Genealogía
                        </h3>
                      </v-col>

                      <v-col cols="12" md="6" sm="12">
                        <v-row density="comfortable">
                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idCorralActual" :items="data.corrales" item-title="nombre" item-value="id" label="Corral Actual" prepend-inner-icon="mdi-fence" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule" hide-details/>
                          </v-col>
                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idLote" :items="data.lotes" item-title="nombre" item-value="id" label="Lote" prepend-inner-icon="mdi-format-list-group" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule" hide-details/>
                          </v-col>
                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idMadre" :items="data.parents" item-title="nombre" item-value="id" label="Madre (Opcional)" prepend-inner-icon="mdi-gender-female" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule" hide-details/>
                          </v-col>
                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idPadre" :items="data.parents" item-title="nombre" item-value="id" label="Padre (Opcional)" prepend-inner-icon="mdi-gender-male" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule" hide-details/>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" md="6" sm="12">
                        <v-row density="comfortable">
                          <v-col cols="12" md="12" sm="6">
                            <v-text-field v-model.number="data.formulario.pesoNacimiento" type="text" step="0.1" hide-details label="Peso Nacimiento (lbs)" prepend-inner-icon="mdi-weight" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>
                          <v-col cols="12" md="12" sm="6">
                            <v-text-field v-model.number="data.formulario.pesoActual" type="text" step="0.1" hide-details label="Peso Actual (lbs)" prepend-inner-icon="mdi-scale-bathroom" color="indigo-darken-4" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <!-- Sección: Reproducción y Detalles -->
                          <v-col cols="12" md="12" sm="6">
                            <v-text-field v-model.number="data.formulario.cantidadPezones" type="number" label="N° Pezones" prepend-inner-icon="mdi-dots-grid" color="indigo-darken-4" variant="outlined" hide-details density="comfortable" rounded="xl" />
                          </v-col>
                          <v-col cols="12" md="12" sm="6">
                            <v-text-field v-model.number="data.formulario.nPartos" type="number" label="N° Partos" prepend-inner-icon="mdi-baby-buggy" color="indigo-darken-4" variant="outlined" hide-details density="comfortable" rounded="xl" />
                          </v-col>
                        </v-row>
                      </v-col>

                      <!-- Características visuales -->
                      <v-col cols="12" md="12" sm="12">
                        <v-textarea v-model="data.formulario.caracteristicas" label="Características (Manchas, cicatrices, etc.)" prepend-inner-icon="mdi-clipboard-text-outline" color="indigo-darken-4" variant="outlined" density="comfortable" rows="2" rounded="xl" :rules="data.rules.rule" hide-details auto-grow/>
                      </v-col>
                    </v-row>
                  </v-window-item>

                </v-window>
              </v-col>

              <!-- Botones de Acción -->
              <v-col cols="12" md="12" sm="12" class="d-flex justify-end mt-4">
                <v-btn v-if="data.wind > 1" class="mr-3" variant="tonal" color="grey-darken-2" prepend-icon="mdi-arrow-left" rounded="lg" @click="setWindow('bf')">
                  Atrás
                </v-btn>

                <v-btn v-if="data.wind < 2" append-icon="mdi-arrow-right" variant="flat" color="indigo-lighten-1" rounded="lg" @click="setWindow('af')">
                  Siguiente
                </v-btn>

                <v-btn v-if="data.wind == 2" color="indigo-darken-4" variant="flat" prepend-icon="mdi-content-save-check" rounded="lg" @click="saveEjemplar()">
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <OverlayComp
      :show="data.overlay.show"
      :msg="data.overlay.msg"
      :success="data.overlay.success"
      :error="data.overlay.error"
    />
  </div>
</template>


<script setup lang="ts">
import {onActivated, onMounted, reactive, ref, watch} from 'vue'
//@ts-ignore
import type {CreateEjemplar, Ejemplar} from "@/common/types/apiTypes.ts";
//@ts-ignore
import RequestHttp from "@/services/requestHttp.ts";
//@ts-ignore
import {endPoints} from "@/api/endPoints.ts";
//@ts-ignore
import type {ItemsCombobox} from "@/common/types/apiTypes.ts";
import OverlayComp from "@/reusable/OverlayComp.vue";
import {useRouter} from "vue-router";


const requestHttp = new RequestHttp();
const refForm = ref(null)
const router = useRouter()

// PROPS
const props = defineProps({
  id: {
    type: [Number, String],
    required: false
  }
})

// Inicialización reactiva del formulario
const data = reactive({
  rules: {
    //@ts-ignore
    rule: [v => !!v || 'El campo es obligatorio'],
  },
  overlay: {
    show: false,
    msg: 'Creando registro',
    success: false,
    error: false,
  },
  formulario: {
    codigo: '',
    sexo: 'Macho',
    idEtapaPorcinoActual: null,
    origen: '',
    nombre: '',
    caracteristicas: '',
    fechaIngreso: '',
    fechaNacimiento: '',
    cantidadPezones: null,
    nPartos: null,
    pesoNacimiento: null,
    pesoActual: null,
    imagen: null,
    estado: true,
    idCorralActual: null,
    idLote: null,
    idMadre: null,
    idPadre: null,
    idRaza: null,
    idTipoCerdo: null
  } as CreateEjemplar,
  razas: [] as ItemsCombobox[],
  tiposCerdo: [] as ItemsCombobox[],
  etapas: [] as ItemsCombobox[],
  corrales: [] as ItemsCombobox[],
  lotes: [] as ItemsCombobox[],
  parents: [] as ItemsCombobox[],

  wind: 1,
})

const estadoInicialFormulario = {
  codigo: "",
  fechaNacimiento: null,
  nombre: "",
  sexo: null,
  origen: "",
  estado: true,
  fechaIngreso: null,
  idRaza: null,
  idTipoCerdo: null,
  idEtapaPorcinoActual: null,
  idCorralActual: null,
  idLote: null,
  idMadre: null,
  idPadre: null,
  pesoNacimiento: null,
  pesoActual: null,
  cantidadPezones: null,
  nPartos: null,
  caracteristicas: ""
};

function setWindow(opc: "af" | 'bf') {
  if (opc === "af") {
    data.wind += 1
  } else {
    data.wind -= 1
  }
}

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

    data.razas = razas.data
    data.lotes = lotes.data
    data.tiposCerdo = tiposCerdos.data
    data.corrales = corrales.data
    data.etapas = etapas.data
    data.parents = padres.data
  } catch (e) {
    console.log(e)
  }
}

// 1. Bandera para evitar doble petición en la carga inicial
const primeraCarga = ref(true);

async function cargarInformacion (idCerdo: number | string) {
  data.overlay.show = true
  data.overlay.msg = 'Cargando datos...'
  await getCombobox();

  const result = await requestHttp.getEjemplarById(Number(idCerdo));

  if (result && result.code === 200) {
    data.formulario = result.data as Ejemplar & {
      tipoCerdo: string;
      corral: string;
      padre: string;
      madre: string;
      lote: string;
      etapa: string;
      raza: string;
    };

    data.formulario.tipoCerdo = data.tiposCerdo.find((item: ItemsCombobox) => item.id === data.formulario.idTipoCerdo)?.nombre || 'N/A';

    data.formulario.corral = data.corrales.find((item: ItemsCombobox) => item.id === data.formulario.idCorralActual)?.nombre || 'N/A';

    data.formulario.padre = data.parents.find((item: ItemsCombobox) => item.id === data.formulario.idPadre)?.nombre || 'Desconocido';

    data.formulario.madre = data.parents.find((item: ItemsCombobox) => item.id === data.formulario.idMadre)?.nombre || 'Desconocida';

    data.formulario.lote = data.lotes.find((item: ItemsCombobox) => item.id === data.formulario.idLote)?.nombre || 'Sin lote';

    data.formulario.etapa = data.etapas.find((item: ItemsCombobox) => item.id === data.formulario.idEtapaPorcinoActual)?.nombre || 'N/A';

    data.formulario.raza = data.razas.find((item: ItemsCombobox) => item.id === data.formulario.idRaza)?.nombre || 'N/A';

    imagePreview.value = result.data.imgUrl

    data.overlay.show = false
  } else {
    data.overlay.error = true
    data.overlay.msg = `${result.msg || 'No se pudo cargar los datos'}`
    return setTimeout(() => {
      data.overlay.error = false
      data.overlay.show = false

      resetForm()
      router.go(-1)
    }, 3000)
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

// 2. Este hook detecta cuando vuelves a entrar a la pantalla cacheada
onActivated(async () => {
  if (!primeraCarga.value && props.id) {
    // Fuerzas la recarga de datos al volver a entrar
    await cargarInformacion(props.id);
  }
  primeraCarga.value = false;
});


async function saveEjemplar() {
  //@ts-ignore
  const valid = await refForm?.value.validate()

  if (!valid.valid) return

  data.overlay.show = true
  data.overlay.msg = Number(props.id) && Number(props.id) > 0 ? 'Editando registro...' : 'Creando registro...'

  const response: {
    code: number,
    data: any,
    msg: any
  } = Number(props.id) && Number(props.id) > 0 ?  await requestHttp.putEjemplar({...data.formulario, pesoActual: data.formulario.pesoActual.toString(), pesoNacimiento: data.formulario.pesoNacimiento.toString()}, props.id) : await requestHttp.postEjemplar({...data.formulario, pesoActual: data.formulario.pesoActual.toString(), pesoNacimiento: data.formulario.pesoNacimiento.toString()})

  if(response.code === 200 || response.code === 201) {
    if (selectedFile.value && !Number(props.id)) {
      const formData = new FormData();
      // @ts-ignore
      formData.append('foto', selectedFile.value);

      data.overlay.msg = 'Registrando imagen'
      const responseImg = await requestHttp.postImgEjemplar(formData, response.data.datos.idCerdo || 0)

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
    refForm?.value.reset()
    imagePreview.value = ''

    data.overlay.success = true
    data.overlay.msg = 'Registro completado'
    return setTimeout(() => {
      data.wind = 1
      data.overlay.success = false
      data.overlay.show = false

      router.go(-1)
    }, 2500)

  } else {
    data.overlay.error = true
    data.overlay.msg = `${response.msg}`
    return setTimeout(() => {
      data.overlay.error = false
      data.overlay.show = false
    }, 2500)
  }
}

function resetForm() {
  data.wind = 1
  // @ts-ignore
  refForm.value.resetValidation();

  // 3. Forzar el vaciado de TODOS los datos del modelo reactivo
  // Esto garantiza que no quede basura del registro anterior
  Object.assign(data.formulario, { ...estadoInicialFormulario });
  // @ts-ignore
  refForm.value.resetValidation();

  // 4. Limpiar variables independientes (Imagen)
  imagePreview.value = '';

  // (Opcional pero recomendado) Limpiar el input de archivo físico si lo estás usando
  if (fileInput.value) {
    // @ts-ignore
    fileInput.value.value = '';
  }
}

onMounted(async () => {
  await getCombobox();
})


const defaultImageUrl = '';
const fileInput = ref(null);

const triggerFileUpload = () => {
  if (fileInput.value) {
    //@ts-ignore
    fileInput.value.click();
  }
};

const imagePreview = ref(defaultImageUrl);

const selectedFile = ref(null);

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
</script>


<style scoped>

</style>