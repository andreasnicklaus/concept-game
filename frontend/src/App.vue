<template>
  <v-app>
    <v-layout>
        <v-app-bar color="primary" prominent>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title @click="$router.push('/')">Concept - Das Spiel</v-toolbar-title>
        </v-app-bar>

      <v-navigation-drawer v-model="drawer" nav>
        <v-list color="primary">
          <v-list-item prepend-icon="mdi-home" to="/" title="Home"></v-list-item>
          <v-list-item prepend-icon="mdi-help" to="/instructions" title="Anleitung"></v-list-item>
          <v-list-item prepend-icon="mdi-information" to="/about" title="Über"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>

      <v-snackbar v-model="$store.state.snackbar.show">
        {{$store.state.snackbar.text}}

        <template v-slot:actions>
          <v-btn @click="$store.commit('closeSnackbar')">Schließen</v-btn>
        </template>
      </v-snackbar>

    </v-layout>
  </v-app>
</template>

<script>

export default {
  name: "App",
  data () {
    return {
      drawer: null
    }
  }
}
</script>

<style>
.v-toolbar-title:hover {
  cursor: pointer
}
</style>
