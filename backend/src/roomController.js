const { v4: uuidv4 } = require("uuid");
const { ConceptGame } = require("./concept-game.js");
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
    console.log("broadcasting message for room", roomCode)
    Object.entries(rooms[roomCode]).forEach(([key, value]) => {
        if (key === "game") return;
        let { socket } = value;
        socket.send(JSON.stringify(data));
    });
}

function sendOutNextWord(roomCode) {
    const game = rooms[roomCode].game
    const currentUUID = Object.keys(game.playerList)[game.currentPlayerIndex]
    const { socket } = rooms[roomCode][currentUUID]
    socket.send(JSON.stringify({ type: "nextWord", word: game.currentWord }))
}

module.exports.handleMessage = function (socket, uuid, data) {
    console.log("Message from", uuid)
    data = JSON.parse(data)
    console.log("Got message", JSON.stringify(data))

    let { meta, roomCode, name, stones, tip, readyStatus } = data;
    if (!roomCode) roomCode = getRoomCode(uuid);

    if (meta === "join") {
        if (!roomCode) {
            roomCode = uuidv4()
            rooms[roomCode] = { game: new ConceptGame() }
            console.log("Created room", roomCode)
        }

        rooms[roomCode].game.addPlayer(uuid, { name, ready: false })
        rooms[roomCode][uuid] = { socket: socket }
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
        broadCastMessage(roomCode, { type: "gameStart" })
        sendOutNextWord(roomCode)
    } else if (meta === "readyStatus") {
        rooms[roomCode].game.setPlayerReadyStatus(uuid, readyStatus)
    } else if (meta === "stoneUpdate") {
        rooms[roomCode].game.defineStones(uuid, stones)
    } else if (meta === "tipGiven") {
        if (rooms[roomCode].game.isRightTip(uuid, tip)) {
            broadCastMessage(roomCode, { type: "TipWasRight", tip })
            rooms[roomCode].game.startGame()
            sendOutNextWord(roomCode)
        }
    }

    if (roomCode) broadCastMessage(roomCode, { roomCode, game: rooms[roomCode].game.getPublicInfo() })
    else console.log("Not sending because roomCode is", roomCode)
}