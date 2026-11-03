<template>
  <div v-if="joined" class="game">
    <template v-if="gameReady">
      <header class="game-top">
        <div class="game-turn">
          <p class="tag tag--pink">{{ isMyTurn ? 'Du gibst die Hinweise' : 'Rate mit' }}</p>
          <h1>{{ turnTitle }}</h1>
          <p class="game-turn__hint">{{ turnHint }}</p>
        </div>

        <div class="score-row" role="list" aria-label="Punktestand">
          <PlayerChip
            v-for="(player, index) in players"
            :key="player.name"
            role="listitem"
            :player="player"
            :active="index === currentPlayerIndex"
            :is-you="player.name === playerName"
          />
        </div>
      </header>

      <div class="game-body">
        <aside class="game-meta">
          <section class="panel" aria-labelledby="hints-title">
            <h2 id="hints-title" class="panel__title">Gelegte Hinweise</h2>
            <ul v-if="hints.length" class="hint-list">
              <li v-for="field in hints" :key="field.index" class="hint-row">
                <span class="hint-row__names">
                  <span v-for="name in field.names" :key="name">{{ name }}</span>
                </span>
                <StonePin :stones="field.stones" :label="field.names.join(', ')" />
              </li>
            </ul>
            <p v-else class="panel__empty">
              Noch keine Steine auf dem Brett.
            </p>
          </section>

          <section class="panel" aria-labelledby="messages-title">
            <h2 id="messages-title" class="panel__title">Nachrichten</h2>

            <form v-if="!isMyTurn" class="guess-form" @submit.prevent="send">
              <label class="visually-hidden" for="guess">Dein Tipp</label>
              <input
                id="guess"
                v-model="tip"
                class="field__input"
                type="text"
                name="guess"
                placeholder="Dein Tipp"
                autocomplete="off"
                maxlength="80"
                @keydown.esc="tip = ''"
              />
              <button class="btn btn--sm" type="submit" :disabled="!tip.trim()">
                Senden
              </button>
            </form>
            <p v-else class="panel__empty">
              Du legst die Hinweise. Die anderen raten.
            </p>

            <ul v-if="messages.length" class="messages" aria-live="polite">
              <li
                v-for="(message, index) in messages"
                :key="index"
                class="message"
                :class="{ 'message--system': !message.sender, 'message--correct': message.correct }"
              >
                <span class="message__sender">
                  {{ message.sender || 'System' }}
                  <span v-if="message.correct" class="tag tag--lime">richtig</span>
                </span>
                <span class="message__text">{{ message.text }}</span>
              </li>
            </ul>
            <p v-else class="panel__empty">Noch keine Nachrichten.</p>

            <button class="btn btn--danger btn--sm" type="button" @click="leave">
              Spiel verlassen
            </button>
          </section>
        </aside>

        <section class="game-board" aria-labelledby="board-title">
          <h2 id="board-title" class="board-title">Begriffsfelder</h2>
          <p class="board-hint">
            {{ isMyTurn ? 'Tippe ein Feld an, um Steine zu setzen.' : 'Die Steine zeigen die Hinweise des Hinweisgebers.' }}
          </p>

          <div class="board-grid">
            <FieldTile
              v-for="field in fields"
              :key="field.index"
              :field="field"
              :interactive="isMyTurn"
              @select="openStoneSettingDialog"
            />
          </div>
        </section>
      </div>
    </template>

    <EmptyState
      v-else
      inline
      title="Das Spiel startet"
      text="Die Runde wird vorbereitet. Das Brett erscheint, sobald die erste Person ein Wort bekommt."
    >
      <div class="spinner" aria-hidden="true" />
      <span class="visually-hidden">Lädt</span>
    </EmptyState>

    <YourTurnDialog v-model="yourTurnOpen" />
    <StoneSettingDialog v-model="stoneSettingDialog" :field="selectedField" />
  </div>

  <EmptyState
    v-else
    title="Kein Spiel geladen"
    text="Diese Seite ist der Spielraum, aber Name oder Raumcode sind nicht gesetzt. Starte von der Startseite ein neues Spiel oder tritt einem bei."
  >
    <RouterLink class="btn btn--primary" to="/">Zur Startseite</RouterLink>
  </EmptyState>
</template>

<script>
import gameService from '@/services/gameService'
import YourTurnDialog from '@/components/YourTurnDialog.vue'
import StoneSettingDialog from '@/components/StoneSettingDialog.vue'
import FieldTile from '@/components/FieldTile.vue'
import StonePin from '@/components/StonePin.vue'
import PlayerChip from '@/components/PlayerChip.vue'
import EmptyState from '@/components/EmptyState.vue'

export default {
  name: 'GameRoomView',

  components: {
    YourTurnDialog,
    StoneSettingDialog,
    FieldTile,
    StonePin,
    PlayerChip,
    EmptyState
  },

  data () {
    return {
      tip: '',
      stoneSettingDialog: false,
      selectedField: null
    }
  },

  computed: {
    playerName () {
      return this.$store.state.playerName
    },
    roomCode () {
      return this.$store.state.roomCode
    },
    players () {
      return this.$store.state.players
    },
    currentPlayerIndex () {
      return this.$store.state.currentPlayerIndex
    },
    currentPlayer () {
      return this.players[this.currentPlayerIndex] || null
    },
    isMyTurn () {
      return this.$store.getters.isMyTurn
    },
    fields () {
      return this.$store.getters.fieldsWithStones
    },
    hints () {
      return this.$store.getters.fieldsWithStonesSet.filter(field =>
        Object.values(field.stones).some(stone => stone.major || stone.minors > 0)
      )
    },
    messages () {
      return this.$store.state.messages.slice(-50).reverse()
    },
    yourTurnOpen: {
      get () {
        return this.$store.state.yourTurnDialogOpen
      },
      set (value) {
        this.$store.commit('setYourTurnDialogOpen', value)
      }
    },
    joined () {
      return Boolean(this.playerName && this.roomCode)
    },
    gameReady () {
      return this.players.length > 0 && this.currentPlayer !== null
    },
    turnTitle () {
      if (this.isMyTurn) return 'Du bist dran'
      if (this.currentPlayer) return `${this.currentPlayer.name} ist dran`
      return 'Gleich geht es los'
    },
    turnHint () {
      if (this.isMyTurn) {
        return 'Tippe auf ein Begriffsfeld, um Steine zu setzen. Grün ist die wichtigste Farbe.'
      }
      return 'Tippe in den Nachrichten, was du vermutest. Escape leert das Feld.'
    }
  },

  beforeUnmount () {
    gameService.leave()
  },

  methods: {
    send () {
      const tip = this.tip.trim()
      if (!tip) return
      gameService.guess(tip)
      this.tip = ''
    },

    openStoneSettingDialog (field) {
      this.selectedField = field
      this.stoneSettingDialog = true
    },

    leave () {
      this.$router.push('/')
    }
  }
}
</script>
