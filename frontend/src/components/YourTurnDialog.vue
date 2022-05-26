<template>
  <v-card>
    <v-card-title>Du bist dran!</v-card-title>
    <v-card-text>
      <p>Dein Wort ist:</p>

      <h1>{{$store.state.myLastWord}}</h1>

    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" text @click="$emit('close')">Schließen</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "YourTurnDialog"
}
</script>

<style>
.v-card-text {
  text-align: center;
}
</style>
