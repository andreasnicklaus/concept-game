<template>
  <v-container id="HomeView">
    <v-col class="d-flex flex-column">
      <v-btn color="primary" prepend-icon="mdi-send" class="ma-2 align-self-center" @click="startDialog = true">Neues Spiel starten</v-btn>
      <v-btn variant="contained-text" color="primary" prepend-icon="mdi-account-multiple-plus" class="ma-2 align-self-center" @click="joinDialog = true">Beitreten</v-btn>
      <v-btn variant="contained-flat" color="" prepend-icon="mdi-help-circle" class="ma-2 align-self-center" to="/instructions">Anleitung</v-btn>
    </v-col>
  </v-container>

  <v-dialog v-model="startDialog" width="500">
    <StartGameDialog @close="startDialog=false" @start="startGame"></StartGameDialog>
  </v-dialog>

  <v-dialog v-model="joinDialog" width="500">
    <JoinGameDialog @close="joinDialog = false" @join="joinGame"></JoinGameDialog>
  </v-dialog>
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

  methods: {
    startGame () {
      this.startDialog = false
      gameService.join()
      this.$router.push("/waitingRoom")
    },

    joinGame () {
      this.joinDialog = false
      gameService.join()
      this.$router.push("/waitingRoom")
    }
  }

}
</script>

<style>
#HomeView {
  height: 99%;
  display: grid;
  place-items: center;
}
</style>
