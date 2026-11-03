<template>
  <BaseDialog v-model="open" title="Steine platzieren">
    <p class="dialog__note">
      Für «{{ (field && field.names) ? field.names.join(', ') : '' }}».
      <span v-if="field && field.img_src" class="visually-hidden">
        Feld mit Bild {{ field.img_src }}.
      </span>
    </p>

    <div class="stone-setter">
      <div
        v-for="color in colors"
        :key="color"
        class="stone-row"
      >
        <span class="stone-row__name">
          <span class="swatch" :class="`swatch--${color}`" aria-hidden="true" />
          {{ colorLabel(color) }}
        </span>

        <label class="check">
          <input
            type="checkbox"
            v-model="stones[color].major"
            :aria-label="`Hauptstein ${colorLabel(color)}`"
          />
          Hauptstein
        </label>

        <div class="stepper" role="group" :aria-label="`Anzahl Steine ${colorLabel(color)}`">
          <button
            class="stepper__btn"
            type="button"
            aria-label="Einen Stein weniger"
            :disabled="stones[color].minors <= 0"
            @click="stones[color].minors = Math.max(0, stones[color].minors - 1)"
          >
            −
          </button>
          <span class="stepper__value" aria-live="polite">{{ stones[color].minors }}</span>
          <button
            class="stepper__btn"
            type="button"
            aria-label="Einen Stein mehr"
            :disabled="stones[color].minors >= 5"
            @click="stones[color].minors = Math.min(5, stones[color].minors + 1)"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <template #actions>
      <button class="btn btn--quiet" type="button" @click="close">Abbrechen</button>
      <button class="btn btn--primary" type="button" @click="save">Speichern</button>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from './BaseDialog.vue'
import gameService from '@/services/gameService'

const COLOR_ORDER = ['green', 'black', 'blue', 'red', 'yellow']
const COLOR_LABELS = {
  green: 'Grün',
  black: 'Schwarz',
  blue: 'Blau',
  red: 'Rot',
  yellow: 'Gelb'
}

function emptyStones () {
  return COLOR_ORDER.reduce((stones, color) => {
    stones[color] = { major: false, minors: 0 }
    return stones
  }, {})
}

export default {
  name: 'StoneSettingDialog',

  components: { BaseDialog },

  props: {
    modelValue: { type: Boolean, default: false },
    field: { type: Object, default: null }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      stones: emptyStones()
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
    colors () {
      return COLOR_ORDER
    }
  },

  watch: {
    modelValue (value) {
      if (value) this.load()
    },
    field () {
      if (this.modelValue) this.load()
    }
  },

  methods: {
    colorLabel (color) {
      return COLOR_LABELS[color]
    },
    load () {
      if (!this.field) return
      this.stones = this.$store.getters.getStonesForField(this.field)
    },
    close () {
      this.open = false
    },
    save () {
      if (!this.field) {
        this.close()
        return
      }
      this.$store.commit('saveStones', {
        stones: this.stones,
        fieldIndex: this.field.index
      })
      gameService.updateStones()
      this.close()
    }
  }
}
</script>
