<template>
  <component
    :is="interactive ? 'button' : 'div'"
    :type="interactive ? 'button' : undefined"
    class="field-tile"
    @click="interactive ? $emit('select', field) : null"
  >
    <img
      v-if="field.img_src"
      class="field-tile__img"
      :src="`/fieldIMGs/${field.img_src}.png`"
      alt=""
      width="38"
      height="38"
      loading="lazy"
    />
    <span v-else class="field-tile__glyph" aria-hidden="true">{{ initial }}</span>

    <span class="field-tile__names">
      <span v-for="name in field.names" :key="name">{{ name }}</span>
    </span>

    <span class="field-tile__stones">
      <StonePin v-if="hasStones" :stones="field.stones" :label="stoneLabel" />
    </span>

    <span v-if="interactive" class="visually-hidden">
      Steine für {{ field.names.join(', ') }} setzen
    </span>
  </component>
</template>

<script>
import StonePin from './StonePin.vue'

const COLOR_NAMES = {
  green: 'grün',
  black: 'schwarz',
  blue: 'blau',
  red: 'rot',
  yellow: 'gelb'
}

export default {
  name: 'FieldTile',

  components: { StonePin },

  props: {
    field: { type: Object, required: true },
    interactive: { type: Boolean, default: false }
  },

  emits: ['select'],

  computed: {
    initial () {
      return (this.field.names[0] || '?').charAt(0).toUpperCase()
    },
    hasStones () {
      return Object.values(this.field.stones || {}).some(
        stone => stone.major || stone.minors > 0
      )
    },
    stoneLabel () {
      const parts = []
      for (const [color, stone] of Object.entries(this.field.stones || {})) {
        if (stone.major) parts.push(`Hauptstein ${COLOR_NAMES[color]}`)
        if (stone.minors > 0) {
          parts.push(`${stone.minors} ${stone.minors === 1 ? 'Stein' : 'Steine'} ${COLOR_NAMES[color]}`)
        }
      }
      return `Steine: ${parts.join(', ')}`
    }
  }
}
</script>
