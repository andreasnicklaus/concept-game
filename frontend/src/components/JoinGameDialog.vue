<template>
  <BaseDialog v-model="open" title="Spiel beitreten">
    <form id="join-game-form" class="field" @submit.prevent="submit">
      <label class="field__label" for="join-name">Dein Name</label>
      <input
        id="join-name"
        v-model="name"
        class="field__input"
        name="playerName"
        type="text"
        autocomplete="nickname"
        maxlength="20"
        autofocus
        :aria-invalid="showError && !validName"
        aria-describedby="join-name-help"
      />
      <p id="join-name-help" class="field__help">So sehen dich die anderen im Raum.</p>

      <label class="field__label" for="join-code">Raumcode</label>
      <input
        id="join-code"
        v-model="roomCode"
        class="field__input"
        name="roomCode"
        type="text"
        autocomplete="off"
        autocapitalize="none"
        spellcheck="false"
        :aria-invalid="showError && !validCode"
        aria-describedby="join-code-help"
      />
      <p id="join-code-help" class="field__help">
        Den Code bekommst du von jemandem, der schon im Raum ist.
      </p>

      <p v-if="showError && !valid" class="field__error" role="alert">
        Name und Raumcode fehlen noch.
      </p>
    </form>

    <template #actions>
      <button class="btn btn--quiet" type="button" @click="close">Abbrechen</button>
      <button class="btn btn--primary" type="submit" form="join-game-form" :disabled="!valid">
        Beitreten
      </button>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from './BaseDialog.vue'

export default {
  name: 'JoinGameDialog',

  components: { BaseDialog },

  props: {
    modelValue: { type: Boolean, default: false }
  },

  emits: ['update:modelValue', 'join'],

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
    roomCode: {
      get () {
        return this.$store.state.roomCode
      },
      set (value) {
        this.$store.commit('setRoomCode', { roomCode: value })
      }
    },
    validName () {
      return this.name.trim().length > 0
    },
    validCode () {
      return this.roomCode.trim().length > 0
    },
    valid () {
      return this.validName && this.validCode
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
      this.$store.commit('setRoomCode', { roomCode: this.roomCode.trim() })
      this.open = false
      this.$emit('join')
    }
  }
}
</script>
