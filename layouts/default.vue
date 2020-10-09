<template>
  <div :class="classes">
    <!-- loading screen -->
    <LoadingScreen v-if="showLoadingScreen" />
    <!-- navbar -->
    <MainNavbar
      :userLoggedIn="userLoggedIn"
      :useDark="useDark"
      @toggleUseDark="toggleUseDark"
      @logout="logout"
    />
    <!-- page -->
    <Nuxt />
  </div>
</template>

<script lang="ts">
// imports
import MainNavbar from '../components/main-navbar.vue';
import LoadingScreen from '../components/loading-screen.vue';
import { auth } from '../utils/firebase.utils';
import storage from '../utils/storage';
// stores
import { mapActions } from 'vuex';
// component
export default {
  // state
  data() {
    return {
      showLoadingScreen: true,
    };
  },
  // computed values
  computed: {
    uid: function () {
      return this.$store.state.auth.uid;
    },
    userToken: function () {
      return this.$store.state.auth.userToken;
    },
    userInitialized: function () {
      return this.$store.state.auth.userInitialized;
    },
    userLoggedIn: function () {
      return !!this.uid;
    },
    useDark: function () {
      return !!this.$vuetify?.theme?.dark;
    },
    classes: function () {
      const classes = [];
      // theme
      classes.push(this.useDark ? 'dark' : 'light');
      return classes;
    },
  },
  // methods
  methods: {
    // ---
    // initialize
    // ---
    initializeLoadingScreen: function () {
      const loadingScreenTimeout = setTimeout(() => {
        this.setShowLoadingScreen(false);
      }, 1500);
      return loadingScreenTimeout;
    },
    initializeUseDark: function () {
      let useDarkLS: boolean | undefined = storage.getItem('useDark');
      if (typeof useDarkLS !== 'boolean') {
        useDarkLS = true;
        storage.setItem('useDark', true);
      }
      this.$vuetify.theme.dark = useDarkLS;
    },
    initializeAuth: function () {
      const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          const { uid } = currentUser;
          const token = await currentUser.getIdToken();
          // set uid and token, trigger fetch for user data
          this.$store.dispatch('auth/setUid', uid);
          this.$store.dispatch('auth/setUserToken', token);
          this.$store.dispatch('auth/setUserData', null);
          this.$store.dispatch('auth/setUserInitialized', false);
        } else {
          // set uid/token/data to falsey, set initialized to true
          this.clearAuthState();
        }
      });
      return unsubscribe;
    },

    // ---
    // state hooks
    // ---

    setShowLoadingScreen: function (show) {
      this.showLoadingScreen = show;
    },

    clearAuthState: function () {
      this.$store.dispatch('auth/setUid', null);
      this.$store.dispatch('auth/setUserToken', null);
      this.$store.dispatch('auth/setUserData', null);
      this.$store.dispatch('auth/setUserInitialized', true);
    },

    // ---
    // events
    // ---

    toggleUseDark: function () {
      const newUseDark = !this.$vuetify?.theme?.dark;
      storage.setItem('useDark', newUseDark);
      this.$vuetify.theme.dark = newUseDark;
    },
    logout: async function () {
      // sign out firebase user
      await auth.signOut();

      // this.clearAuthState();
    },
  },
  // watch
  watch: {
    uid: function () {
      // exit if initialized
      if (this.userInitialized) return;
      // user data
      let userData: any;
      //
      if (this.uid) {
        // get user data
        // *** db fetch logic here ***
        userData = {}; // placeholder
      } else {
        userData = null;
      }
      // update store
      this.$store.dispatch('auth/setUserData', userData);
      this.$store.dispatch('auth/setUserInitialized', true);
    },
  },
  // mounted
  mounted() {
    this.loadingScreenTimeout = this.initializeLoadingScreen();
    // initialize theme
    this.initializeUseDark();
    // initialize auth
    this.unsubscribe = this.initializeAuth();
  },
  // before destroy (cleanup)
  beforeDestroy() {
    clearTimeout(this.loadingScreenTimeout);
    this.unsubscribe();
  },
};
</script>

<style lang="scss">
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
}

.dark {
  background-color: #000;
  color: #fff;
}
.light {
  background-color: #ddd;
  color: #000;
}
</style>
