<template>
  <v-card>
    <v-card-title>Einem laufenden Spiel beitreten:</v-card-title>
    <v-card-text>
      <p>Um einem laufenden Spiel beizutreten, musst du dir selber einen Namen geben und den Raumcode angeben. Dein Name wird allen Spielern im Raum angezeigt. Du bekommst den Raumcode von Spielern, die bereits im Spielraum sind.</p>

      <div class="mt-4">
        <v-text-field label="Dein Name" v-model="$store.state.playerName"></v-text-field>
        <v-text-field label="Raumcode" v-model="$store.state.roomCode"></v-text-field>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" text @click="$emit('close')">Abbrechen</v-btn>
      <v-btn color="primary" variant="contained" @click="$emit('join')" :disabled="$store.getters.joinInfoGiven">Beitreten</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "JoinGameDialog"
}
</script>
