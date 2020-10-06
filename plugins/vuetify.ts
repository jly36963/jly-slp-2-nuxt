// vue imports
import Vue from 'vue';
// vuetify imports
import Vuetify from 'vuetify';

// import 'vuetify/dist/vuetify.min.css';
// import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default (ctx) => {
  const vuetify = new Vuetify({
    theme: {
      dark: true,
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          // colors
        },
        dark: {
          // colors
        },
      },
    },
  });
  ctx.app.vuetify = vuetify;
  ctx.$vuetify = vuetify.framework;
};

// vuetify plugin
// https://stackoverflow.com/a/59656920/8508220

// customize theme
// https://vuetifyjs.com/en/features/theme/

// toggle between themes
// https://stackoverflow.com/a/59605454/8508220
