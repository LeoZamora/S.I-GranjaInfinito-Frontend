<template>
  <v-overlay v-model="showOverlay" max-width="100%" max-height="100%" class="d-flex justify-center align-center" contained persistent>
    <div class="d-flex flex-column justify-center align-center">
      <v-card elevation="10" rounded="xl" class="d-flex flex-column justify-center align-center pa-8 border" max-width="300px">
        <v-progress-circular
            v-if="!successOvelay && !errorOvelay"
            indeterminate
            size="40"
            width="6"
            color="indigo-darken-4"
        ></v-progress-circular>

        <v-icon
          v-if="!errorOvelay && successOvelay"
          size="50"
          color="green"
        >
          mdi-check-circle
        </v-icon>

        <v-icon
            v-if="errorOvelay"
            size="50"
            color="error"
        >
          mdi-close-circle
        </v-icon>

        <span class="mt-4 text-center">
            {{ msgOvelay }}
        </span>
      </v-card>
    </div>
  </v-overlay>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'OverlayComp',

  props: {
    show: {
      type: Boolean,
      required: true
    },

    msg: {
      type: String,
      required: true
    },

    success: {
      type: Boolean,
      required: true,
      default: false
    },

    error: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  setup(props) {
    const showOverlay = ref(props.show)
    const msgOvelay = ref(props.msg)
    const successOvelay = ref(props.success)
    const errorOvelay = ref(props.error)

    watch(() => props.show, (val) => {
      showOverlay.value = val
    })

    watch(() => props.msg, (val) => {
      msgOvelay.value = val
    })

    watch(() => props.success, (val) => {
      successOvelay.value = val
    })

    watch(() => props.error, (val) => {
      errorOvelay.value = val
    })

    return {
      showOverlay,
      msgOvelay,
      successOvelay,
      errorOvelay
    }
  }
}
</script>