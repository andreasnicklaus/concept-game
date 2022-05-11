<template>
  <p>{{this.$store.state.fields.length}}</p>
  <HelloWorld />
</template>

<script>
import { defineComponent } from 'vue'

// Components
import HelloWorld from '../components/HelloWorld.vue'

export default defineComponent({
  name: 'HomeView',

  components: {
    HelloWorld
  }

})
</script>
