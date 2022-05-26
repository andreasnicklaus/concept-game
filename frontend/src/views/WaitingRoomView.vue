<template>
  <div v-if="$store.state.playerName && $store.state.roomCode" class="ma-4">
    <v-container>
      <v-row justify="space-between" align="center">
        <h1>Warteraum ⌛</h1>
        <v-btn color="error" variant="text" append-icon="mdi-close-circle-outline" @click="leave">Verlassen</v-btn>
      </v-row>
    </v-container>

    <!-- INFO BAR -->
    <div class="d-flex justify-space-between my-2">
      <!-- PLAYER INFO -->
      <v-card class="align-self-start">
        <v-card-title>Dein Name</v-card-title>
        <v-card-text>{{$store.state.playerName}}</v-card-text>
      </v-card>

      <!-- ROOM CODE -->
      <v-card class="align-self-start">
        <v-card-title>Raumcode</v-card-title>
        <v-card-text>{{$store.state.roomCode}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="outlined" prepend-icon="mdi-clipboard-text-multiple" @click="copyToClipboard">Kopieren</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <v-divider/>

    <!-- PLAYER LIST -->
    <v-list>
      <v-list-subheader>Spieler</v-list-subheader>
      <v-list-item v-for="(player, i) in $store.state.players" :key="i" >
        <v-tooltip anchor="top">
          <template v-slot:activator="{ props }">
            <v-list-item-avatar start v-bind="props">
              <v-icon :color="player.ready? 'success': 'error'" :icon="player.ready? 'mdi-account-check': 'mdi-account-alert'"></v-icon>
            </v-list-item-avatar>
          </template>
          <span v-if="player.ready">{{player.name}} ist bereit</span>
          <span v-else>{{player.name}} ist nicht bereit</span>
        </v-tooltip>
        <v-list-item-title :color="player.ready? 'success': 'error'" v-text="player.name"></v-list-item-title>

        <v-spacer></v-spacer>

        <span v-if="player.name === $store.state.playerName">
          <v-btn v-if="!player.ready" color="success" @click="readyUp">Bereit</v-btn>
          <v-btn v-else variant="plain" color="warning" @click="unready">Nicht bereit</v-btn>
        </span>
      </v-list-item>
    </v-list>

    <v-divider/>

    <!-- GAME CONTROL -->
    <div class="d-flex justify-end my-2">
      <v-btn color="success" prepend-icon="mdi-arrow-right" :disabled="!$store.getters.allPlayersReady" @click="startGame">Spiel starten</v-btn>
    </div>
  </div>

  <div v-else id="roomNotInitialised">
    <div class="ma-8">
      <h1>Oops, das hat nicht funktioniert... 😥</h1>
      <p>This is supposed to be the waiting room, but something didn't work. Your can try to fix this by starting over:</p>
      <p>Das hier sollte der Warteraum sein, aber etwas hat nicht geklappt. Du kannst einen Fix versuchen, indem du von Vorne anfängst:</p>
      <v-btn color="primary" class="ma-2" to="/" prepend-icon="mdi-arrow-right">Zurück</v-btn>
    </div>
  </div>
</template>

<script>
import gameService from "@/services/gameService"

export default {
  name: 'WaitingRoomView',

  methods: {
    copyToClipboard () {
      navigator.clipboard.writeText(this.$store.state.roomCode)
      this.$store.dispatch('snack', { message: 'Zum Clipboard kopiert 👍' })
    },

    readyUp () { gameService.readyUp() },
    unready () { gameService.unready() },

    startGame () {
      gameService.start()
      this.$router.push("/gameRoom")
    },

    leave () {
      gameService.leave()
      this.$router.push('/')
    }
  }
}
</script>

<style>
h1 {
  display: inline-block;
}

#roomNotInitialised {
  display: grid;
  place-items: center;
  height: 100%;
  text-align: center;
}
</style>
