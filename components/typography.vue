<template>
  <div>
    <div :class="textClass">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
// component
export default {
  name: 'Typography',
  props: {
    variant: {
      type: String,
      default: 'body1',
      validator: (val) =>
        [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'subtitle1',
          'subtitle2',
          'body1',
          'body2',
          'caption',
          'button',
          'overline',
          'srOnly',
          'inherit',
        ].includes(val),
    },
    fontWeight: {
      type: String,
      default: 'regular',
      validator: (val) =>
        ['bold', 'medium', 'regular', 'light', 'thin'].includes(val),
    },
  },
  computed: {
    textClass: function () {
      const classesArray = [];
      classesArray.push(this.variant); // variant
      classesArray.push(this.fontWeight); // fontWeight
      return classesArray;
    },
  },
};
</script>

<style scoped>
/* size */
.h1 {
  font-size: 6rem;
  font-weight: 300;
  letter-spacing: -1.5px;
}
.h2 {
  font-size: 3.75rem;
  font-weight: 300;
  letter-spacing: -0.5px;
}
.h3 {
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0px;
}
.h4 {
  font-size: 2.125rem;
  font-weight: 400;
  letter-spacing: 0.25px;
}
.h5 {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0px;
}
.h6 {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.15px;
}
.subtitle1 {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.15px;
}
.subtitle2 {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.1px;
}
.body1 {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.5px;
}
.body2 {
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.25px;
}
.caption {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.4px;
}
.button {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.25px;
}
.overline {
  font-size: 0.625rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

/* font weight */
.bolder {
  @apply font-black; /* 900 */
}
.bold {
  @apply font-bold; /* 700 */
}
.medium {
  @apply font-medium; /* 500 */
}
.regular {
  @apply font-normal; /* 400 */
}
.light {
  @apply font-light; /* 300 */
}
.thin {
  @apply font-hairline; /* 100 */
}
</style>

<!-- https://material.io/design/typography/the-type-system.html#type-scale -->
