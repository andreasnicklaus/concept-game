export default {
  closeSnackbar (state) {
    state.snackbar.show = false
  },

  openSnackbar (state, message) {
    state.snackbar.text = message
    state.snackbar.show = true
  },

  changeReadyStatus (state, { playerName, newStatus }) {
    state.players.find(player => player.name === playerName).ready = newStatus
  },

  setPlayers (state, { players }) {
    state.players = players
  },

  setRoomCode (state, { roomCode }) {
    state.roomCode = roomCode
  },

  setCurrentPlayerIndex (state, { currentPlayerIndex }) {
    state.currentPlayerIndex = currentPlayerIndex
  },

  setStones (state, { stones }) {
    state.stones = stones
  },

  setMessages (state, { messages }) {
    state.messages = messages
  },

  setYourTurnDialogOpen (state, newStatus) {
    state.yourTurnDialogOpen = newStatus
  },

  setMyLastWord (state, newWord) {
    state.myLastWord = newWord
  },

  saveStones (state, { stones, field }) {
    const fieldIndex = state.fields.indexOf(field)
    state.stones[fieldIndex] = stones
  }
}
