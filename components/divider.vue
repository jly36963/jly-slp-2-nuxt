<template>
  <VDivider inset :dark="useDark" />
</template>

<script lang="ts">
// imports
import { VDivider } from 'vuetify/lib';
// component
export default {
  name: 'Divider',
  computed: {
    useDark: function () {
      return !!this.$vuetify?.theme?.dark;
    },
  },
  components: {
    VDivider,
  },
};
</script>
