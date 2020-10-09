<template>
  <div class="root">
    <Spinner class="spinner" />
  </div>
</template>

<script>
import Spinner from './spinner.vue';
export default {
  name: 'LoadingScreen',
};
</script>

<style scoped lang="scss">
.root {
  @apply fixed flex w-screen h-screen bg-black text-white z-50;
}
.spinner {
  font-size: 3rem;
  max-width: 300px;
  @apply m-auto;
}
</style>
