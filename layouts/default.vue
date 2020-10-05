<template>
  <div>
    <style>
      :root {
        --bg-color: {{ bgColor }};
        --text-color: {{ textColor }};
      }
    </style>
    <Nuxt />
  </div>
</template>

<script lang="ts">
// component
export default {
  computed: {
    useDark: function () {
      return !!this.$vuetify?.theme?.isDark;
    },
    bgColor: function () {
      return this.useDark ? '#000' : '#ddd';
    },
    textColor: function () {
      return this.useDark ? '#fff' : '#000';
    },
  },
  methods: {
    toggleTheme: function () {
      if (this.$vuetify?.theme?.isDark) {
        this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      }
    },
  },
};
</script>

<style>
/* css reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  font-size: 14px;
  background-color: var(--bg-color);
  color: var(--text-color);
}
</style>
