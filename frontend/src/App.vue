<template>
  <div class="app">
    <a class="skip" href="#main">Zum Inhalt springen</a>

    <header class="app-bar">
      <RouterLink to="/" class="brand" aria-label="Concept, zur Startseite">
        <span class="brand__name">Concept</span>
        <span class="brand__sub">Das Spiel</span>
      </RouterLink>

      <nav class="app-nav" aria-label="Hauptnavigation">
        <RouterLink to="/instructions" class="nav-link">Anleitung</RouterLink>
      </nav>
    </header>

    <main id="main" class="app-main" tabindex="-1">
      <RouterView />
    </main>

    <Transition name="toast">
      <div v-if="snackbar.show" class="toast" role="status" aria-live="polite">
        <span>{{ snackbar.text }}</span>
        <button class="toast__close" type="button" aria-label="Hinweis schließen" @click="closeSnackbar">×</button>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
      toastTimer: null
    }
  },

  computed: {
    snackbar () {
      return this.$store.state.snackbar
    }
  },

  watch: {
    'snackbar.show' (show) {
      window.clearTimeout(this.toastTimer)
      if (show) {
        this.toastTimer = window.setTimeout(() => this.closeSnackbar(), 4000)
      }
    }
  },

  beforeUnmount () {
    window.clearTimeout(this.toastTimer)
  },

  methods: {
    closeSnackbar () {
      this.$store.commit('closeSnackbar')
    }
  }
}
</script>