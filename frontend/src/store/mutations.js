export default {
  closeSnackbar (state) {
    state.snackbar.show = false
  },

  setPlayerName (state, playerName) {
    state.playerName = playerName
  },

  openSnackbar (state, message) {
    state.snackbar.text = message
    state.snackbar.show = true
  },

  changeReadyStatus (state, { playerName, newStatus }) {
    const player = state.players.find(player => player.name === playerName)
    if (player) player.ready = newStatus
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

  saveStones (state, { stones, fieldIndex }) {
    if (fieldIndex == null || !state.fields[fieldIndex]) return
    state.stones[fieldIndex] = stones
  }
}
