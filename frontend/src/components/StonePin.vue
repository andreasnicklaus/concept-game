<template>
  <span
    v-if="marks.length"
    class="stone-pin"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <span
      v-for="(mark, i) in marks"
      :key="i"
      class="stone"
      :class="[`stone--${mark.color}`, { 'stone--major': mark.major }]"
    />
  </span>
</template>

<script>
const COLOR_ORDER = ['green', 'black', 'blue', 'red', 'yellow']

export default {
  name: 'StonePin',

  props: {
    stones: { type: Object, default: () => ({}) },
    label: { type: String, default: '' }
  },

  computed: {
    marks () {
      const marks = []
      for (const color of COLOR_ORDER) {
        const stone = this.stones[color]
        if (!stone) continue
        if (stone.major) marks.push({ color, major: true })
        const minors = Math.min(Math.max(Number(stone.minors) || 0, 0), 5)
        for (let i = 0; i < minors; i++) marks.push({ color, major: false })
      }
      return marks
    }
  }
}
</script>
