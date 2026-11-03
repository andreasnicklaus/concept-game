<template>
  <section class="state" :class="{ 'state--inline': inline }">
    <h1 v-if="title" class="state__title">{{ title }}</h1>
    <p class="state__text">{{ text }}</p>
    <slot />
  </section>
</template>

<script>
export default {
  name: 'EmptyState',

  props: {
    title: { type: String, default: '' },
    text: { type: String, required: true },
    inline: { type: Boolean, default: false }
  }
}
</script>
