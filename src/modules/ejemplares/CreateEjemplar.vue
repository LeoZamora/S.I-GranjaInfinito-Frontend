<template>
  <div class="w-100 ma-auto">
    <div class="d-flex justify-space-between align-center px-4">
      <div>
        <h2>Nuevo Ejemplar</h2>
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
              class="rounded-xl overflow-hidden cursor-pointer"
              elevation="2"
            >
              <v-img
                :src="img"
                height="100%"
                width="100%"
                cover
              >
              </v-img>
            </v-card>
          </v-col>

          <v-col cols="12" md="8" sm="8">
            <v-row density="comfortable" class="pa-2">
              <v-col cols="12" md="12" sm="12">
                <v-window v-model="data.wind">
                  <v-window-item :value="1">
                    <v-row>
                      <v-col cols="12" class="d-flex justify-space-between align-center">
                        <h3 class="text-subtitle-1 font-weight-bold mb-2 mt-2">Información General</h3>
                      </v-col>

                      <v-col cols="12" md="6" sm="6">
                        <v-row density="comfortable">
                          <v-col cols="12" md="12" sm="12">
                            <v-text-field v-model="data.formulario.codigo" label="Codigo" variant="outlined" hide-details density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12" >
                            <v-date-input v-model="data.formulario.fechaNacimiento" append-inner-icon="mdi-calendar" prepend-icon="" label="Fecha de Nacimiento" variant="outlined" hide-details density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-text-field v-model="data.formulario.nombre" label="Nombre" variant="outlined" density="comfortable" hide-details rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.sexo" :items="['Macho', 'Hembra']" label="Sexo" variant="outlined" density="comfortable" hide-details rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-text-field v-model="data.formulario.origen" label="Origen (Granja, Compra, etc.)" hide-details variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" md="6" sm="6">
                        <v-row density="comfortable">
                          <v-col cols="12" md="12" sm="12" class="d-flex justify-end align-center">
                            <v-switch v-model="data.formulario.estado" :label="data.formulario.estado ? 'Activo' : 'Inactivo'" color="success" hide-details rounded="xl" :rules="data.rules.rule" hide-spin-buttons density="compact" class="mb-2"/>

                          </v-col>


                          <v-col cols="12" md="12" sm="12">
                            <v-date-input v-model="data.formulario.fechaIngreso" append-inner-icon="mdi-calendar" prepend-icon="" label="Fecha de Ingreso" hide-details variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idRaza" :items="data.razas" item-title="nombre" item-value="id" label="Raza" variant="outlined" density="comfortable" hide-details rounded="xl" :rules="data.rules.rule"/>
                          </v-col>
                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idTipoCerdo" :items="data.tiposCerdo" item-title="nombre" item-value="id" label="Tipo de Cerdo" variant="outlined" density="comfortable" hide-details rounded="xl" :rules="data.rules.rule"/>
                          </v-col>
                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idEtapaPorcinoActual" :items="data.etapas" item-title="nombre" item-value="id" label="Etapa Actual" variant="outlined" density="comfortable" hide-details rounded="xl" :rules="data.rules.rule"/>
                          </v-col>
                        </v-row>
                      </v-col>
                  </v-row>
                  </v-window-item>

                  <v-window-item :value="2">
                    <v-row density="comfortable">
                      <v-col cols="12">
                        <h3 class="text-subtitle-1 font-weight-bold mt-2 mb-2">Ubicación y Genealogía</h3>
                      </v-col>

                      <v-col cols="12" md="6" sm="12">
                        <v-row density="comfortable">
                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idCorralActual" :items="data.corrales" item-title="nombre" item-value="id" label="Corral Actual" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule" hide-details/>
                          </v-col>
                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idLote" :items="data.lotes" item-title="nombre" item-value="id" label="Lote" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule" hide-details/>
                          </v-col>
                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idMadre" :items="data.parents" item-title="nombre" item-value="id" label="Madre (Opcional)" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule" hide-details/>
                          </v-col>
                          <v-col cols="12" md="12" sm="12">
                            <v-autocomplete clearable v-model="data.formulario.idPadre" :items="data.parents" item-title="nombre" item-value="id" label="Padre (Opcional)" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule" hide-details/>
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" md="6" sm="12">
                        <v-row density="comfortable">
                          <v-col cols="12" md="12" sm="6">
                            <v-text-field v-model.number="data.formulario.pesoNacimiento" type="text" step="0.1" hide-details label="Peso Nacimiento (lbs)" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>
                          <v-col cols="12" md="12" sm="6">
                            <v-text-field v-model.number="data.formulario.pesoActual" type="text" step="0.1" hide-details label="Peso Actual (lbs)" variant="outlined" density="comfortable" rounded="xl" :rules="data.rules.rule"/>
                          </v-col>

                          <!-- Sección: Reproducción y Detalles -->
                          <v-col cols="12" md="12" sm="6">
                            <v-text-field v-model.number="data.formulario.cantidadPezones" type="number" label="N° Pezones" variant="outlined" hide-details density="comfortable" rounded="xl" />
                          </v-col>
                          <v-col cols="12" md="12" sm="6">
                            <v-text-field v-model.number="data.formulario.nPartos" type="number" label="N° Partos" variant="outlined" density="comfortable" rounded="xl" />
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" md="12" sm="12">
                        <v-col cols="12" md="6" sm="12">
                          <v-textarea v-model="data.formulario.caracteristicas" label="Características (Manchas, cicatrices, etc.)" variant="outlined" density="comfortable" rows="2" rounded="xl" :rules="data.rules.rule" hide-details/>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-window-item>

                </v-window>
              </v-col>

              <v-col cols="12" md="12" sm="12" class="d-flex justify-end">
                <v-btn v-if="data.wind > 1" class="mr-2" variant="text" append-icon="mdi-arrow-left" @click="setWindow('bf')">
                  Atras
                </v-btn>

                <v-btn v-if="data.wind < 2" append-icon="mdi-arrow-right" variant="text" @click="setWindow('af')">
                  Siguiente
                </v-btn>

                <v-btn v-if="data.wind == 2" color="indigo-darken-4" rounded="lg" @click="saveEjemplar()">
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!--    <SuccessAlert-->
    <!--        :success="data.alertSuccess.success"-->
    <!--        :msg="data.alertSuccess.msg"-->
    <!--        :show="data.alertSuccess.show"-->
    <!--    />-->

<!--    <transition name="slide-y-transition">-->
<!--      <AlertComp-->
<!--          :show="data.alert.show3"-->
<!--          :type="data.alert.type"-->
<!--          :message="data.alert.message"/>-->
<!--    </transition>-->
  </div>
</template>


<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
//@ts-ignore
import type {CreateEjemplar} from "@/common/types/apiTypes.ts";
import img from "/imgs/pig.jpg";
//@ts-ignore
import RequestHttp from "@/services/requestHttp.ts";
//@ts-ignore
import {endPoints} from "@/api/endPoints.ts";
//@ts-ignore
import type {ItemsCombobox} from "@/common/types/apiTypes.ts";

const requestHttp = new RequestHttp();

const refForm = ref(null)

// Inicialización reactiva del formulario
const data = reactive({
  rules: {
    //@ts-ignore
    rule: [v => !!v || 'El campo es obligatorio'],
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
  parents: [],

  wind: 1,
})

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

    console.log(data)
  } catch (e) {
    console.log(e)
  }
}

async function saveEjemplar() {
  //@ts-ignore
  const valid = await refForm?.value.validate()

  if (!valid.valid) return

  console.log(data.formulario)

  const response: { code: number, data: any, msg: any } = await requestHttp.postEjemplar({...data.formulario, pesoActual: data.formulario.pesoActual.toString(), pesoNacimiento: data.formulario.pesoNacimiento.toString()})

  if(response.code === 200 || response.code === 201) {
    console.log('Registro exitoso')
    refForm?.value.reset()
  } else {
    console.log('Registro fallido')
  }
}

function resetForm() {
  //@ts-ignore
  refForm.value.reset()
}

onMounted(async () => {
  await getCombobox();
})

</script>


<style scoped>

</style>