<template>
  <BaseDialog v-model="open" title="Neues Spiel">
    <form id="start-game-form" class="field" @submit.prevent="submit">
      <label class="field__label" for="start-name">Dein Name</label>
      <input
        id="start-name"
        v-model="name"
        class="field__input"
        name="playerName"
        type="text"
        autocomplete="nickname"
        maxlength="20"
        autofocus
        :aria-invalid="showError && !valid"
        aria-describedby="start-name-help"
      />
      <p id="start-name-help" class="field__help">
        So sehen dich die anderen im Raum. Ein bis zwanzig Zeichen.
      </p>
      <p v-if="showError && !valid" class="field__error" role="alert">
        Schreib zuerst einen Namen.
      </p>
    </form>

    <template #actions>
      <button class="btn btn--quiet" type="button" @click="close">Abbrechen</button>
      <button class="btn btn--primary" type="submit" form="start-game-form" :disabled="!valid">
        Raum öffnen
      </button>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from './BaseDialog.vue'

export default {
  name: 'StartGameDialog',

  components: { BaseDialog },

  props: {
    modelValue: { type: Boolean, default: false }
  },

  emits: ['update:modelValue', 'start'],

  data () {
    return {
      showError: false
    }
  },

  computed: {
    open: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    },
    name: {
      get () {
        return this.$store.state.playerName
      },
      set (value) {
        this.$store.commit('setPlayerName', value)
      }
    },
    valid () {
      return this.name.trim().length > 0
    }
  },

  methods: {
    close () {
      this.showError = false
      this.open = false
    },
    submit () {
      this.showError = true
      if (!this.valid) return
      this.$store.commit('setPlayerName', this.name.trim())
      this.open = false
      this.$emit('start')
    }
  }
}
</script>
