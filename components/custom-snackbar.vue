<template>
  <VSnackbar
    :timeout="5000"
    :value="open"
    :color="color"
    :bottom="true"
    :left="true"
  >
    {{ message }}
  </VSnackbar>
</template>

<script lang="ts">
// imports
import { VSnackbar } from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
// component
export default {
  name: 'CustomSnackbar',
  components: {
    VSnackbar,
  },
  props: {
    message: { type: String, default: undefined },
    type: { type: String, default: 'info' },
    open: { type: Boolean, default: false },
  },
  computed: {
    color: function () {
      let color;
      switch (this.type) {
        case 'success':
          color = colors.green.base;
          break;
        case 'warning':
          color = colors.yellow.base;
          break;
        case 'error':
          color = colors.red.base;
          break;
        case 'info':
          color = colors.grey.darken3;
          break;
        default:
          color = colors.grey.darken3;
      }
      return color;
    },
  },
};
</script>
