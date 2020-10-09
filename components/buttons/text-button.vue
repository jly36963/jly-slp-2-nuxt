<template>
  <VBtn :dark="dark" :ripple="true" :elevation="20" :small="small" text rounded>
    {{ text }}
  </VBtn>
</template>

<script lang="ts">
// imports
import { VBtn } from 'vuetify/lib';
// component
export default {
  name: 'TextButton',
  props: {
    text: String,
    small: { type: Boolean, default: false },
  },
  computed: {
    dark: function () {
      return !!this.$vuetify?.theme?.isDark;
    },
  },
};
</script>
