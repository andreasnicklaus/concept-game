<template>
  <v-card>
    <v-card-title>Spielsteine platzieren:</v-card-title>
    <v-card-subtitle>Wähle die Spielsteine, die du hier platzieren willst: {{field.names.join(', ')}}</v-card-subtitle>
    <v-card-text>
      <v-list active-strategy="">
        <v-list-item v-for="color in Object.keys(stones)" :key="color" :value="color">
            <v-list-item-avatar >
              <v-checkbox v-model="stones[color].major" hide-details :color="color"></v-checkbox>
            </v-list-item-avatar>

            <v-list-item-header>
              <v-chip label :color="color">
                <v-icon>{{color === "green"? 'mdi-alert-rhombus': 'mdi-help-rhombus'}}</v-icon>
              </v-chip>
            </v-list-item-header>
        </v-list-item>
      </v-list>

      <v-container>
        <v-slider v-for="color in Object.keys(stones)" :key="color"
          step="1" min="0" max="5" thumb-label="always" :thumb-color="color"
          :color="color" v-model="stones[color].minors"></v-slider>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="close">Abbrechen</v-btn>
      <v-btn @click="save" variant="contained" color="primary">Speichern</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import gameService from '@/services/gameService'

export default {
  name: "StoneSettingDialog",

  props: ['field'],

  data () {
    return {
      stones: {
        green: { major: false, minors: 0 },
        black: { major: false, minors: 0 },
        blue: { major: false, minors: 0 },
        red: { major: false, minors: 0 },
        yellow: { major: false, minors: 0 }
      }
    }
  },

  beforeMount () {
    this.stones = this.$store.getters.getStonesForField(this.field)
  },

  methods: {
    close () {
      this.$emit('close')
    },

    save () {
      this.$store.commit('saveStones', { stones: this.stones, field: this.field })
      gameService.updateStones()
      this.close()
    }
  }
}
</script>
