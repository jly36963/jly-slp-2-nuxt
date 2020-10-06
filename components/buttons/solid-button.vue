<template>
  <VBtn
    :color="color"
    :elevation="20"
    :small="small"
    ripple
    dark
    rounded
    outlined
  >
    {{ text }}
  </VBtn>
</template>

<script lang="ts">
// imports
import { VBtn } from 'vuetify/lib';
// component
export default {
  name: 'SolidButton',
  props: {
    text: String,
    color: { type: String, default: '#7B1FA2' },
    small: { type: Boolean, default: false },
  },
};
</script>
