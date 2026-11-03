<template>
  <span class="player-chip" :class="{ 'player-chip--active': active }">
    <span class="player-chip__avatar" aria-hidden="true">{{ initial }}</span>
    <span class="player-chip__name">
      {{ player.name }}<span v-if="isYou" class="visually-hidden"> (du)</span>
    </span>
    <span class="player-chip__points">
      {{ player.points }}<span class="visually-hidden"> Punkte</span>
    </span>
    <span v-if="active" class="tag tag--lime">dran</span>
  </span>
</template>

<script>
export default {
  name: 'PlayerChip',

  props: {
    player: { type: Object, required: true },
    active: { type: Boolean, default: false },
    isYou: { type: Boolean, default: false }
  },

  computed: {
    initial () {
      return (this.player.name || '?').charAt(0).toUpperCase()
    }
  }
}
</script>
