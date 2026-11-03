<template>
  <div v-if="joined" class="waiting">
    <header class="waiting__head">
      <div>
        <h1 class="waiting__title">Wer ist dabei?</h1>
      </div>
      <button class="btn btn--danger btn--sm" type="button" @click="leave">
        Verlassen
      </button>
    </header>

    <div class="waiting__grid">
      <section aria-labelledby="players-title">
        <h2 id="players-title" class="panel__title">
          Spieler ({{ players.length }})
        </h2>

        <ul v-if="players.length" class="player-list">
          <li v-for="player in players" :key="player.name" class="player-row">
            <span class="player-row__name">
              <span class="player-chip__avatar" aria-hidden="true">{{ initial(player.name) }}</span>
              <span>{{ player.name }}</span>
              <span v-if="player.name === playerName" class="tag tag--muted">du</span>
            </span>

            <span class="player-row__actions">
              <span v-if="player.name === playerName" class="tag" :class="player.ready ? 'tag--lime' : ''">
                {{ player.ready ? 'bereit' : 'noch nicht bereit' }}
              </span>
              <span v-else class="tag" :class="player.ready ? 'tag--lime' : 'tag--muted'">
                {{ player.ready ? 'bereit' : 'wartet' }}
              </span>

              <template v-if="player.name === playerName">
                <button v-if="!player.ready" class="btn btn--quiet btn--sm" type="button" @click="readyUp">
                  Bereit
                </button>
                <button v-else class="btn btn--quiet btn--sm" type="button" @click="unready">
                  Nicht bereit
                </button>
              </template>
            </span>
          </li>
        </ul>

        <p v-else class="waiting__hint">
          Noch niemand eingetragen. Sobald beigetreten wird, erscheinen die Namen hier.
        </p>
      </section>

      <aside class="room-code" aria-labelledby="room-code-label">
        <span id="room-code-label" class="room-code__label">Raumcode</span>
        <p class="room-code__value">{{ roomCode }}</p>
        <div class="room-code__actions">
          <button class="btn btn--sm" type="button" @click="copyCode">Code kopieren</button>
        </div>
        <p class="room-code__note">
          Schick den Code an alle, die mitspielen. Er gilt nur für diesen Raum.
        </p>
      </aside>
    </div>

    <footer class="waiting__foot">
      <p class="waiting__hint">{{ hint }}</p>
      <button class="btn btn--primary" type="button" :disabled="!allPlayersReady" @click="startGame">
        Spiel starten
      </button>
    </footer>
  </div>

  <EmptyState
    v-else-if="playerName"
    inline
    title="Raum wird geöffnet"
    text="Einen Moment, die Verbindung zum Spiel wird aufgebaut."
  >
    <div class="spinner" aria-hidden="true" />
    <span class="visually-hidden">Lädt</span>
  </EmptyState>

  <EmptyState
    v-else
    title="Der Raum fehlt noch"
    text="Diese Seite ist der Warteraum, aber Name oder Raumcode sind nicht gesetzt. Starte von der Startseite ein neues Spiel oder tritt einem bei."
  >
    <RouterLink class="btn btn--primary" to="/">Zur Startseite</RouterLink>
  </EmptyState>
</template>

<script>
import gameService from '@/services/gameService'
import EmptyState from '@/components/EmptyState.vue'

export default {
  name: 'WaitingRoomView',

  components: { EmptyState },

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
    joined () {
      return Boolean(this.playerName && this.roomCode)
    },
    allPlayersReady () {
      return this.$store.getters.allPlayersReady
    },
    hint () {
      if (this.players.length < 2) {
        return 'Teile den Raumcode, damit jemand beitreten kann.'
      }
      if (!this.allPlayersReady) {
        return 'Es fehlen noch Bereitschaften. Jede Person meldet sich selbst bereit.'
      }
      return 'Alle sind bereit. Jemand kann das Spiel starten.'
    }
  },

  methods: {
    initial (name) {
      return (name || '?').charAt(0).toUpperCase()
    },

    copyCode () {
      const code = this.roomCode
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(code).then(
          () => this.$store.dispatch('snack', { message: 'Raumcode kopiert.' }),
          () => this.copyFallback()
        )
        return
      }
      this.copyFallback()
    },

    copyFallback () {
      this.$store.dispatch('snack', {
        message: 'Kopieren geht hier nicht. Markiere den Code und kopiere ihn von Hand.'
      })
    },

    readyUp () {
      gameService.readyUp()
    },

    unready () {
      gameService.unready()
    },

    startGame () {
      gameService.start()
      this.$router.push('/gameRoom')
    },

    leave () {
      gameService.leave()
      this.$router.push('/')
    }
  }
}
</script>
