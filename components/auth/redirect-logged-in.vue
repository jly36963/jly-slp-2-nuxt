<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RedirectLoggedIn',
  computed: {
    uid: function () {
      return this.$store.state.auth.uid;
    },
    userInitialized: function () {
      return this.$store.state.auth.userInitialized;
    },
  },
  methods: {
    toHome() {
      if (this.userInitialized && this.uid) {
        this.$router.push('/');
      }
    },
  },
  watch: {
    uid() {
      this.toHome();
    },
    userInitialized() {
      this.toHome();
    },
  },
};
</script>
