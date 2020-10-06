<template>
  <VSheet
    class="sheet"
    :color="color"
    :elevation="elevation"
    :dark="useDark"
    :height="height"
    :width="width"
    rounded
  >
    <slot />
  </VSheet>
</template>

<script lang="ts">
// imports
import { VSheet } from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
// component
export default {
  name: 'PaddedPaper',
  props: {
    height: { type: [Number, String], default: undefined },
    width: { type: [Number, String], default: undefined },
    elevation: { type: Number, default: 7 },
  },
  computed: {
    useDark: function () {
      return !!this.$vuetify?.theme?.dark;
    },
    color: function () {
      const color: string = this.useDark
        ? colors.grey.darken4
        : colors.shades.white;
      return color;
    },
  },
  components: {
    VSheet,
  },
};
</script>

<style>
.sheet {
  @apply p-4;
}
</style>
