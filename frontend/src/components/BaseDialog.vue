<template>
  <v-dialog
    :model-value="modelValue"
    content-class="sticker-dialog"
    scrim
    @update:model-value="update"
  >
    <div class="dialog">
      <header class="dialog__head">
        <h2 class="dialog__title">{{ title }}</h2>
        <button class="icon-btn" type="button" aria-label="Dialog schließen" @click="close">×</button>
      </header>

      <div class="dialog__body">
        <slot />
      </div>

      <footer v-if="$slots.actions" class="dialog__actions">
        <slot name="actions" />
      </footer>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseDialog',

  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, required: true }
  },

  emits: ['update:modelValue'],

  methods: {
    update (value) {
      this.$emit('update:modelValue', value)
    },
    close () {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>
