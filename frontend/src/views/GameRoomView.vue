<template>
  <div v-if="$store.state.playerName && $store.state.roomCode">
    <div v-if="$store.state.currentPlayerIndex != null">

      <!-- player top bar -->
      <v-container>
        <v-row dense align="center">
          <v-col cols="12" :sm="12 / $store.state.players.length" v-for="(player, i) in $store.state.players" :key="i">
            <v-card :color="player.name === $store.state.players[$store.state.currentPlayerIndex].name ? 'primary': ''">
              <v-card-title>
                <span>{{player.name}}</span>
                <v-spacer></v-spacer>
                <span>{{player.points}}</span>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>

      </v-container>

      <v-divider></v-divider>

      <!-- game area -->
      <v-container>
        <v-row>
          <!-- meta area -->
          <v-col cols="12" md="4">
            <v-container class="ma-2">
              <v-row justify="space-around">
                <v-col v-for="(field, i) in $store.getters.fieldsWithStonesSet" :key="i">
                  <v-card>
                    <v-card-text>
                      <v-row align="center">
                        <v-col>
                          <p v-for="(name, j) in field.names" :key="j">{{name}}</p>
                        </v-col>
                        <v-col>
                          <p v-for="(stoneSet, color) in field.stones" :key="i + color">
                            <v-chip v-if="stoneSet.major" :color="color"><v-icon>mdi-help-box</v-icon></v-chip>
                            <v-icon v-for="minor in stoneSet.minors" :key="i + color + minor" :color="color">mdi-help-rhombus</v-icon>
                          </p>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>

            <!-- guesses -->
            <v-container class="ma-2">
              <v-card id="guesses">
                <v-card-title>Nachrichten</v-card-title>

                <!-- guess input -->
                <v-container>
                  <v-text-field v-model="tip" label="Your guess" append-icon="mdi-send"
                  @click:append="send" @keyup.enter="send" @keyup.escape="this.tip = ''"
                  clearable type="text" color="primary" hide-details
                  :disabled="$store.getters.isMyTurn"></v-text-field>
                </v-container>

                <!-- message list -->
                <v-container id="msg-list">
                  <v-row justify="space-between" align="center" v-for="(message, i) in $store.state.messages.slice(-50).reverse()" :key="i">
                    <v-col>
                      {{message.sender}}
                      <v-chip v-if="message.correct" label color="success">Korrekt</v-chip>
                      <v-chip v-if="!message.sender" label color="default">System</v-chip>
                    </v-col>
                    <v-col cols="auto" style="text-align: right;">{{message.text}}</v-col>
                  </v-row>
                </v-container>

                <v-container>
                  <v-btn color="error" variant="text" append-icon="mdi-close-circle-outline" @click="leave">Leave</v-btn>
                </v-container>
              </v-card>
            </v-container>
          </v-col>

          <!-- fields -->
          <v-col cols="12" md="8">
            <v-container>
              <v-row>
                <v-col class="align-self-end" cols="12" sm="6" md="4" lg="3"  v-for="(field, i) in $store.getters.fieldsWithStones" :key="i">

                  <!-- Clickable card if isMyTurn -->
                  <v-card v-if="$store.getters.isMyTurn" class="v-btn v-btn--elevated field-card" @click="openStoneSettingDialog(field)">
                    <div class="v-btn__overlay"></div>
                    <div class="v-btn__underlay"></div>
                    <v-card-text>
                      <v-row align="center" justify="space-between">
                        <v-col>
                          <v-img max-height="100" max-width="100" :src="`/fieldIMGs/${field.img_src}.png`"></v-img>
                        </v-col>
                        <v-col justify="center" align="center">
                          <p v-for="(name, j) in field.names" :key="j">{{name}}</p>
                        </v-col>
                        <v-col>
                          <p v-for="(stoneSet, color) in field.stones" :key="i + color">
                            <v-chip v-if="stoneSet.major" :color="color"><v-icon large>mdi-help-box</v-icon></v-chip>
                            <v-icon v-for="minor in stoneSet.minors" :key="i + color + minor" :color="color">mdi-help-rhombus</v-icon>
                          </p>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

                  <!-- Non-clickable card -->
                  <v-card v-else>
                    <v-card-text>
                      <v-row align="center">
                        <v-col>
                          <p v-for="(name, j) in field.names" :key="j">{{name}}</p>
                        </v-col>
                        <v-col>
                          <p v-for="(stoneSet, color) in field.stones" :key="i + color">
                            <v-chip v-if="stoneSet.major" :color="color"><v-icon large>mdi-help-box</v-icon></v-chip>
                            <v-icon v-for="minor in stoneSet.minors" :key="i + color + minor" :color="color">mdi-help-rhombus</v-icon>
                          </p>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>

      <!-- Your turn dialog -->
      <v-dialog v-model="$store.state.yourTurnDialogOpen" width="500">
        <YourTurnDialog @close="$store.commit('setYourTurnDialogOpen', false)"></YourTurnDialog>
      </v-dialog>

      <!-- Setting stones dialog -->
      <v-dialog v-model="stoneSettingDialog">
        <StoneSettingDialog :field="field" @close="stoneSettingDialog = false"/>
      </v-dialog>
    </div>

    <div v-else id="gameloading">
      <v-progress-circular
      indeterminate
      :size="70"
      :width="7"
      color="primary"/>
    </div>
  </div>

  <div v-else id="roomNotInitialised">
    <div class="ma-8">
      <h1>Oops, this didn't work... 😥</h1>
      <p>This is supposed to be the game room, but something didn't work. Your can try to fix this by starting over:</p>
      <v-btn color="primary" class="ma-2" to="/" prepend-icon="mdi-arrow-right">Go back</v-btn>
    </div>
  </div>
</template>

<script>
import gameService from '@/services/gameService'
import YourTurnDialog from '@/components/YourTurnDialog'
import StoneSettingDialog from '@/components/StoneSettingDialog.vue'

export default {
  name: 'GameRoomView',

  components: {
    YourTurnDialog,
    StoneSettingDialog
  },

  unmounted () {
    gameService.leave()
  },

  data () {
    return {
      tip: "",
      stoneSettingDialog: false,
      selectedField: null
    }
  },

  methods: {
    send () {
      if (this.tip) {
        gameService.guess(this.tip)
        this.tip = ""
      }
    },

    openStoneSettingDialog (field) {
      this.field = field
      this.stoneSettingDialog = true
    },

    leave () {
      gameService.leave()
      this.$router.push('/')
    }
  }
}
</script>

<style>
#roomNotInitialised {
  display: grid;
  place-items: center;
  height: 100%;
  text-align: center;
}

#gameloading {
  display: grid;
  place-items: center;
  height: 60vh;
  text-align: center;
}

.v-text-field i:hover {
  cursor: pointer
}

#msg-list {
  max-height: 60vh;
  overflow-y: scroll;
}

.field-card:hover {
  cursor: pointer;
}

</style>
