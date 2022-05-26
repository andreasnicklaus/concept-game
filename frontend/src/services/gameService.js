import router from "@/router"
import store from "@/store"
import websocketService from "./websocketService"

class GameService {
  join () {
    websocketService.send({
      meta: 'join',
      name: store.state.playerName,
      roomCode: store.state.roomCode
    })
  }

  leave () {
    websocketService.send({
      meta: "leave"
    })
  }

  setReady (readyStatus) {
    store.dispatch('setReady', { readyStatus })
    websocketService.send({
      meta: 'readyStatus',
      readyStatus
    })
  }

  readyUp () {
    this.setReady(true)
  }

  unready () {
    this.setReady(false)
  }

  start () {
    websocketService.send({
      meta: "startGame"
    })
  }

  updateStones () {
    websocketService.send({
      meta: "stoneUpdate",
      stones: store.state.stones
    })
  }

  guess (tip) {
    websocketService.send({
      meta: "tipGiven",
      tip
    })
  }

  handleMessage (data) {
    // console.log(`Received message data:`, data)
    const { game, roomCode, type } = data
    if (roomCode) store.commit('setRoomCode', { roomCode })
    if (game) {
      const { currentPlayerIndex, playerList, stones, messages } = game
      if (playerList) store.commit('setPlayers', { players: Object.values(playerList) })
      if (currentPlayerIndex != null) store.commit('setCurrentPlayerIndex', { currentPlayerIndex })
      if (stones) store.commit('setStones', { stones })
      if (messages) store.commit('setMessages', { messages })
    }

    if (type) {
      switch (type) {
        case "nextWord": {
          const { word } = data
          console.log("NEXTWORD:", word)
          store.commit('setMyLastWord', word)
          store.commit('setYourTurnDialogOpen', true)
          break
        }
        case "TipWasRight": {
          const { tip } = data
          store.dispatch('snack', { message: `Das richtige Wort war '${tip}'`, timeout: 4000 })
          break
        }
        case "gameStart": {
          router.push('/gameroom')
          break
        }
        default:
          store.dispatch('snack', { message: `Unknown Websocket message type: ${type}`, timeout: 4000 })
      }
    }
  }
}

export default new GameService()
