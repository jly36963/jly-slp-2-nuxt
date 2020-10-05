<template>
  <VBtn :dark="dark" :ripple="true" :elevation="20" rounded outlined>
    {{ text }}
  </VBtn>
</template>

<script lang="ts">
// imports
import { VBtn } from 'vuetify/lib';
// component
export default {
  name: 'OutlinedButton',
  props: {
    text: String,
  },
  computed: {
    dark: function () {
      return !!this.$vuetify?.theme?.isDark;
    },
  },
  mounted() {
    console.log(this.$props);
  },
};
</script>
