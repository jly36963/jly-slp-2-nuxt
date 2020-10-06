<template>
  <div>
    <style>
      :root {
        --bg-color: {{ bgColor }};
        --text-color: {{ textColor }};
      }
    </style>
    <MainNavbar
      :useDark="useDark"
      @toggleUseDark="toggleUseDark"
      :currentUser="currentUser"
      @setCurrentUser="setCurrentUser"
      @setUserInfo="setUserInfo"
      @logout="logout"
    />
    <Nuxt />
  </div>
</template>

<script lang="ts">
// imports
import MainNavbar from '../components/main-navbar.vue';
// component
export default {
  data() {
    return {
      currentUser: null,
      userInfo: null,
    };
  },
  computed: {
    useDark: function () {
      return !!this.$vuetify?.theme?.dark;
    },
    bgColor: function () {
      return this.useDark ? '#000' : '#ddd';
    },
    textColor: function () {
      return this.useDark ? '#fff' : '#000';
    },
  },
  methods: {
    // set state
    setCurrentUser: function (user) {
      this.currentUser = user;
    },
    setUserInfo: function (info) {
      this.userInfo = info;
    },
    // click events
    toggleUseDark: function () {
      this.$vuetify.theme.dark = !this.$vuetify?.theme?.dark;
    },
    logout: function () {
      this.setCurrentUser(null);
      this.setUserInfo(null);
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
