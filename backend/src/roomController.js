import {v4 as uuidv4} from "uuid";
import {ConceptGame} from "./concept-game.js";
let rooms = {}

function getRoomCode(uuid_given) {
    for (let code of Object.keys(rooms)) {
        for (let uuid of Object.keys(rooms[code])) {
            if (uuid === uuid_given) return code
        }
    }

    return null
}

function broadCastMessage(roomCode, data) {
    Object.entries(rooms[roomCode]).forEach(([key, value]) => {
        if (key === "game") return;
        let {socket} = value;
        socket.send(JSON.stringify(data));
    });
}

export function handleMessage(socket, uuid, data) {
    console.log("Message from", uuid)
    data = JSON.parse(data)
    console.log("Got message", JSON.stringify(data))

    let {meta, name, stones, tip} = data;
    let roomCode = getRoomCode(uuid);

    if (meta === "join") {
        if (!roomCode) {
            roomCode = uuidv4()
            rooms[roomCode] = {game: new ConceptGame()}
        }

        rooms[roomCode].game.addPlayer(uuid, {name})
        rooms[roomCode][uuid] = {socket: socket}
    } else if (meta === "leave") {
        if (!rooms[roomCode]) return
        if (!rooms[roomCode][uuid]) return
        if (Object.keys(rooms[roomCode]).length === 1) delete rooms[roomCode]
        else {
            delete rooms[roomCode][uuid]
            rooms[roomCode].game.deletePlayer(uuid)
        }
    } else if (meta === "startGame") {
        rooms[roomCode].game.startGame()
        const game = rooms[roomCode].game
        const currentUUID = Object.keys(game.playerList)[game.currentPlayerIndex]
        const {socket} = rooms[roomCode][currentUUID]
        socket.send(JSON.stringify({type: "nextWord", word: game.currentWord}))
    } else if (meta === "stoneUpdate") {
        rooms[roomCode].game.defineStones(uuid, stones)
    } else if (meta === "tipGiven") {
        if (rooms[roomCode].game.isRightTip(tip)) {
            broadCastMessage(roomCode, {type: "TipWasRight", tip})
            rooms[roomCode].game.startGame()
        }
    }

    if (roomCode) broadCastMessage(roomCode, {game: rooms[roomCode].game.getPublicInfo()})
}