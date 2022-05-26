<template>
  <v-card>
    <v-card-title>Neues Spiel starten:</v-card-title>
    <v-card-text>
      <p>Um ein neues Spiel zu starten, musst du dir einen Namen geben. Dein Name ist öffentlich für alle Spieler im selben Raum.</p>

      <v-text-field class="mt-2" label="Dein Name" v-model="$store.state.playerName"></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" text @click="$emit('close')">Abbrechen</v-btn>
      <v-btn color="primary" variant="contained" @click="$emit('start')" :disabled="!Boolean($store.state.playerName)">Start</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "StartGameDialog"
}
</script>
