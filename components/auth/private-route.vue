<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PrivateRoute',
  computed: {
    uid: function () {
      return this.$store.state.auth.uid;
    },
    userInitialized: function () {
      return this.$store.state.auth.userInitialized;
    },
  },
  methods: {
    protectRoute() {
      if (this.userInitialized && !this.uid) {
        this.$router.push('/auth/login');
      }
    },
  },
  mounted() {
    this.protectRoute();
  },
  watch: {
    uid() {
      this.protectRoute();
    },
    userInitialized() {
      this.protectRoute();
    },
  },
};
</script>