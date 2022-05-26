<template>
<v-container>
  <v-row justify="center" align="center">
    <v-col justify="center" align="center">
      <h1>Über mich und das Spiel</h1>

      <v-card class="ma-2" max-width="400">
        <v-container>
          <v-img class="rounded-circle ma-2" src="@/assets/AndreasNicklaus.jpeg" height="200" width="200" cover></v-img>
        </v-container>

        <v-card-title>Das bin ich 👋</v-card-title>
        <v-card-subtitle>Andreas Nicklaus</v-card-subtitle>
        <v-card-text>
          <p>Ich habe diese Seite erstellt und bin stolz drauf :)</p>
          <p>Wenn du mich erreichen willst, kannst du das hier tun:</p>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row justify="space-around">
              <v-btn icon="mdi-instagram" href="https://www.instagram.com/andreasnicklaus/"/>
              <v-btn icon="mdi-twitter" href="https://twitter.com/AndreasNicklaus"/>
              <v-btn icon="mdi-linkedin" href="https://www.linkedin.com/in/andreasnicklaus/"/>
              <v-btn icon="mdi-github" href="https://github.com/andreasnicklaus"/>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>

      <v-card class="ma-2" max-width="400">
        <v-card-title>Das Spiel</v-card-title>
        <v-card-text>
          Ich habe mir dieses Spiel nicht selber ausgedacht 🤫
          Diese Spiel ist nicht meins, das echte Spiel kann man kaufen und ich empfehle jedem, genau das zu tun!
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" href="https://www.amazon.de/Asmodee/dp/B00GM988LG?th=1">Zum Shop</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: "AboutView"
}
</script>
