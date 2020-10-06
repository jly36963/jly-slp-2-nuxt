<template>
  <div>
    <div class="spacer" />
    <div class="flex-container">
      <div class="flex-container-main">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FlexContainer',
};
</script>

<style scoped>
.spacer {
  height: 3.75rem;
}
.flex-container {
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 2rem;
  height: calc(100vh - 3.75rem);
  width: 100%;
}
.flex-container-main {
  padding: 2rem;
  margin: auto;
  text-align: center;
}
</style>
