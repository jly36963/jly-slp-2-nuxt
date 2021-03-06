<template>
  <div>
    <style>
      :root {
        --drawer-height: {{ drawerHeight }}
      }
    </style>
    <!-- app bar -->
    <VAppBar :color="color" :dark="useDark" fixed outlined class="app-bar">
      <!-- title -->
      <VToolbarTitle>
        <NuxtLink to="/">SLP</NuxtLink>
      </VToolbarTitle>
      <!-- spacer -->
      <VSpacer />
      <!-- menu button -->
      <VBtn icon @click="toggleDrawerOpen">
        <VIcon>mdi-menu</VIcon>
      </VBtn>
    </VAppBar>
    <!-- drawer -->
    <VNavigationDrawer
      v-model="drawerOpen"
      :dark="useDark"
      :color="color"
      absolute
      temporary
      right
      height="150px"
      width="125px"
      clipped
      class="nav-drawer"
    >
      <VList nav dense>
        <VListItemGroup>
          <template v-for="item of menuItems">
            <VListItem @click="item.action" :key="item.text">
              <VListItemIcon>
                <VIcon>{{ item.icon }}</VIcon>
              </VListItemIcon>
              <VListItemTitle>{{ item.text }}</VListItemTitle>
            </VListItem>
          </template>
        </VListItemGroup>
      </VList>
    </VNavigationDrawer>
  </div>
</template>

<script lang="ts">
// imports
import {
  VAppBar,
  VBtn,
  VIcon,
  VToolbarTitle,
  VSpacer,
  VList,
  VListItem,
  VListItemTitle,
  VListItemIcon,
  VListItemGroup,
  VNavigationDrawer,
} from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
// component
export default {
  name: 'MainNavbar',
  props: {
    useDark: Boolean,
    userLoggedIn: Boolean,
  },
  data() {
    return {
      drawerOpen: false,
    };
  },
  computed: {
    color: function () {
      const color: string = this.useDark
        ? colors.grey.darken4
        : colors.shades.white;
      return color;
    },
    textColor: function () {
      return this.useDark ? '#fff' : '#000';
    },
    menuItems: function () {
      return [
        {
          text: 'Home',
          icon: 'mdi-home',
          action: this.goToHome,
          condition: true,
        },
        {
          text: 'Theme',
          icon: 'mdi-brightness-4',
          action: this.emitToggleUseDark,
          condition: true,
        },
        {
          text: 'Log Out',
          icon: 'mdi-exit-to-app',
          action: this.emitLogout,
          condition: this.userLoggedIn,
        },
        {
          text: 'Log in',
          icon: 'mdi-account',
          action: this.goToLogin,
          condition: !this.userLoggedIn,
        },
      ].filter((item) => item.condition);
    },
    // renderedMenuItems: function () {
    //   return this.menuItems.filter((item) => item.condition);
    // },
    drawerHeight: function () {
      const rem = this.menuItems.length * 3;
      return `${rem}rem`;
    },
  },
  methods: {
    // click events
    toggleDrawerOpen: function (): void {
      this.drawerOpen = !this.drawerOpen;
    },
    goToHome: function (): void {
      this.$router.push('/');
    },
    goToLogin: function (): void {
      this.$router.push('/auth/login');
    },
    emitLogout: function (): void {
      this.$emit('logout');
    },
    emitToggleUseDark: function (): void {
      this.$emit('toggleUseDark');
    },
  },
};
</script>

<style scoped lang="scss">
.app-bar {
  height: 3.75rem !important;
}
.nav-drawer {
  height: var(--drawer-height) !important;
  top: 3.75rem !important;
}
</style>
