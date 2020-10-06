# jly-slp-2 (nuxt)

SLP written with Vue / Nuxt.

## Todo

- Auth
- Types

## Setup

- `npm i`

## Startup (dev)

- `npm run dev`

## Startup (prod)

- `npm run build`
- `npm start`

## Nuxt

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## TS

### Docs

https://typescript.nuxtjs.org/

### Nuxt Config

```js
{
  buildModules: ['@nuxt/typescript-build'];
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "Node",
    "lib": ["ESNext", "ESNext.AsyncIterable", "DOM"],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    },
    "types": ["@types/node", "@nuxt/types"]
  },
  "exclude": ["node_modules"]
}
```

### Types

in the `/` or `/types` directory, add a file `vue-shim.d.ts` with these contents:

```ts
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```

### Components

Use `ts` or `tsx`

```vue
<script lang="ts">
// use TypeScript here
</script>
```

### Scripts

```json
{
  "scripts": {
    "dev": "nuxt-ts",
    "build": "nuxt-ts build",
    "generate": "nuxt-ts generate",
    "start": "nuxt-ts start"
  }
}
```

## Express

Express api is registered in `nuxt.config.js`

```json
{
  "serverMiddleware": [
    // register a handler (api service) to a route
    { "path": "/api", "handler": "~/api/index.js" }
  ]
}
```

## Vuetify

### Components

https://vuetifyjs.com/en/components/buttons/

```vue
<template>
  <div>...</div>
</template>

<script>
import { VBtn } from 'vuetify/lib';
export default {
  components: { VBtn },
};
</script>
```

### Icons

https://vuetifyjs.com/en/components/icons/

```vue
<template>
  <div>
    <VIcon>mdi-account-circle-outline</VIcon>
  </div>
</template>

<script>
import { VIcon } from 'vuetify/lib';
export default {
  components: { VIcon },
};
</script>
```

## Event Handling (listeners/emitters) (child calling parent method)

https://vuejs.org/v2/api/#vm-on
https://michaelnthiessen.com/pass-function-as-prop/
https://stackoverflow.com/a/53739018/8508220
