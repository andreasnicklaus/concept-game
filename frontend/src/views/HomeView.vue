<template>
  <div class="home">
    <section class="home__intro">
      <h1 class="home__title">Ein Wort. Viele Hinweise.</h1>
      <p class="home__lead">
        Eine Person legt Steine auf Begriffsfelder, alle anderen raten. Kein
        Bildschirm teilen, kein Reden nötig, nur ein Gerät pro Person.
      </p>

      <div class="home__actions">
        <button class="btn btn--primary" type="button" @click="startDialog = true">
          Neues Spiel starten
        </button>
        <button class="btn" type="button" @click="joinDialog = true">
          Spiel beitreten
        </button>
      </div>

      <p class="home__note">
        Du kennst das Spiel noch nicht?
        <RouterLink class="text-link" to="/instructions">Die Anleitung erklärt es in zwei Minuten.</RouterLink>
      </p>
    </section>

    <div class="home__board" role="img" :aria-label="previewLabel">
      <div v-for="field in preview" :key="field.index" class="home__tile">
        <img :src="`/fieldIMGs/${field.img_src}.png`" alt="" width="44" height="44" loading="lazy" />
        <span>{{ field.names[0] }}</span>
      </div>
    </div>
  </div>

  <StartGameDialog v-model="startDialog" @start="startGame" />
  <JoinGameDialog v-model="joinDialog" @join="joinGame" />
</template>

<script>
import StartGameDialog from '../components/StartGameDialog.vue'
import JoinGameDialog from '../components/JoinGameDialog.vue'
import gameService from '@/services/gameService'

export default {
  name: 'HomeView',

  components: {
    StartGameDialog,
    JoinGameDialog
  },

  data () {
    return {
      startDialog: false,
      joinDialog: false
    }
  },

  computed: {
    preview () {
      return this.$store.state.fields
        .map((field, index) => ({ ...field, index }))
        .filter(field => field.img_src)
        .slice(0, 6)
    },
    previewLabel () {
      return `Sechs Begriffsfelder aus dem Spiel: ${this.preview.map(field => field.names[0]).join(', ')}.`
    }
  },

  methods: {
    startGame () {
      this.startDialog = false
      this.$store.commit('setRoomCode', { roomCode: '' })
      gameService.join()
      this.$router.push('/waitingRoom')
    },

    joinGame () {
      this.joinDialog = false
      gameService.join()
      this.$router.push('/waitingRoom')
    }
  }
}
</script>
