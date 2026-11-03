import store from "@/store"
import gameService from "./gameService"

const isProduction = process.env.NODE_ENV === "production"
const host = isProduction
  ? `wss://api.concept.andreasnicklaus.de/ws`
  : `ws://localhost:8080/ws`

class WebsocketService {
  ws = new WebSocket(host, ['websocket'])

  constructor () {
    this.ws.onmessage = (msg) => {
      gameService.handleMessage(JSON.parse(msg.data))
    }
    this.ws.onclose = _ => {
      console.warn("Websocket closed")
      store.dispatch('snack', { message: 'Weboscket closed successfully', timeout: 5000 })
    }
    this.ws.onerror = _ => {
      console.warn("Websocket error")
      store.dispatch('snack', { message: 'Weboscket closed with an error', timeout: 5000 })
    }
  }

  send (data) {
    this.ws.send(JSON.stringify(data))
  }
}

export default new WebsocketService()
