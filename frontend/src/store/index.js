import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import fields from './fields.json'

const STONE_COLORS = ['green', 'black', 'blue', 'red', 'yellow']

function emptyStones () {
  return STONE_COLORS.reduce((stones, color) => {
    stones[color] = { major: false, minors: 0 }
    return stones
  }, {})
}

function cloneStones (stones) {
  return STONE_COLORS.reduce((copy, color) => {
    const stone = stones?.[color]
    copy[color] = {
      major: Boolean(stone?.major),
      minors: Number(stone?.minors) || 0
    }
    return copy
  }, {})
}

export default createStore({
  state: {
    fields,
    snackbar: {
      show: false,
      text: 'Keine Meldung'
    },
    playerName: '',
    roomCode: '',
    players: [],
    currentPlayerIndex: 0,
    messages: [],
    myLastWord: '',
    yourTurnDialogOpen: false,
    stones: {}
  },
  getters: {
    getPlayer: (state) => (playerName) => {
      return state.players.find(player => player.name === playerName)
    },

    getCurrentPlayer (state) {
      return state.players[state.currentPlayerIndex] || null
    },

    allPlayersReady (state) {
      return state.players.length > 0 && state.players.every(player => player.ready)
    },

    joinInfoGiven (state) {
      return !(Boolean(state.playerName) && Boolean(state.roomCode))
    },

    isMyTurn (state) {
      const current = state.players[state.currentPlayerIndex]
      return Boolean(current && current.name === state.playerName)
    },

    getStonesForField: (state) => (field) => {
      const index = field?.index ?? state.fields.indexOf(field)
      const givenStones = state.stones[index]
      return givenStones ? cloneStones(givenStones) : emptyStones()
    },

    fieldsWithStones (state) {
      return state.fields.map((field, index) => ({
        ...field,
        index,
        stones: cloneStones(state.stones[index])
      }))
    },

    fieldsWithStonesSet (state) {
      return Object.keys(state.stones)
        .map(Number)
        .filter(index => state.fields[index])
        .sort((a, b) => a - b)
        .map(index => ({
          ...state.fields[index],
          index,
          stones: cloneStones(state.stones[index])
        }))
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
