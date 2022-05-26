import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import fields from './fields.json'

export default createStore({
  state: {
    fields,
    snackbar: {
      show: false,
      text: "No Text defined"
    },
    playerName: "",
    roomCode: "",
    players: [],
    currentPlayerIndex: 0,
    messages: [],
    myLastWord: "",
    yourTurnDialogOpen: false,
    stones: {}
  },
  getters: {
    getPlayer: (state) => (playerName) => {
      return state.players.find(player => player.name === playerName)
    },

    getCurrentPlayer (state) {
      return state.players[state.currentPlayerIndex]
    },

    allPlayersReady (state) {
      return state.players.every(player => player.ready)
    },

    joinInfoGiven (state) {
      return !(Boolean(state.playerName) && Boolean(state.roomCode))
    },

    isMyTurn (state) {
      return state.players[state.currentPlayerIndex].name === state.playerName
    },

    getStonesForField: (state) => (field) => {
      const givenStones = state.stones[state.fields.indexOf(field)]
      return givenStones || {
        green: { major: false, minors: 0 },
        black: { major: false, minors: 0 },
        blue: { major: false, minors: 0 },
        red: { major: false, minors: 0 },
        yellow: { major: false, minors: 0 }
      }
    },

    fieldsWithStones (state) {
      const fieldsCopy = state.fields
      for (const fieldIndex in Object.keys(state.stones)) {
        fieldsCopy[fieldIndex].stones = state.stones[fieldIndex]
      }
      return fieldsCopy
    },

    fieldsWithStonesSet (state) {
      const fieldsCopy = state.fields
      for (const fieldIndex in Object.keys(state.stones)) {
        fieldsCopy[fieldIndex].stones = state.stones[fieldIndex]
      }
      return Object.keys(state.stones).map(i => fieldsCopy[i])
    }
  },

  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  },
  modules: {
  }
})
