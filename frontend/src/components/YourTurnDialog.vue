<template>
  <BaseDialog v-model="open" title="Du bist dran">
    <p class="dialog__note">Dein Wort ist:</p>
    <p class="dialog__word">{{ word }}</p>
    <p class="dialog__note">
      Tippe auf ein Begriffsfeld, um Steine zu setzen. Grün ist die wichtigste Farbe.
    </p>

    <template #actions>
      <button class="btn btn--primary" type="button" @click="close">Verstanden</button>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from './BaseDialog.vue'

export default {
  name: 'YourTurnDialog',

  components: { BaseDialog },

  props: {
    modelValue: { type: Boolean, default: false }
  },

  emits: ['update:modelValue'],

  computed: {
    open: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    },
    word () {
      return this.$store.state.myLastWord || '—'
    }
  },

  methods: {
    close () {
      this.open = false
    }
  }
}
</script>
