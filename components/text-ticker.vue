<template>
  <div>
    <!-- define css variable -->
    <style>
      :root {
        --width: {{ width }}px;
      }
    </style>
    <!-- text ticker -->
    <div class="scrolling-text-container">
      <div :class="useTicker ? 'scrolling-text' : 'normal'">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// imports
import Typography from './typography.vue';
// component
export default {
  name: 'TextTicker',
  components: { Typography },
  props: {
    text: String,
    width: { type: Number, default: 200 },
    threshold: { type: Number, default: 20 },
  },
  computed: {
    useTicker: function (): boolean {
      return this.text.length > this.threshold;
    },
  },
};
</script>

<style scoped>
.scrolling-text-container {
  width: var(--width);
  overflow-x: hidden;
  white-space: nowrap;
}
.scrolling-text {
  white-space: nowrap;
  text-align: center;
  display: inline-flex;
  animation: scrollbackandforth 16s linear infinite;
  animation-delay: 2s;
  /* 
  animation-name: scrollbackandforth;
  animation-duration: 16s;
  animation-timing-function: linear;
  animation-iteration-count: infinite; 
  */
}
@keyframes scrollbackandforth {
  0% {
    transform: translateX(0%);
  }
  25% {
    transform: translateX(-50%);
  }
  75% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
