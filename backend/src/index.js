const { WebSocketServer } = require("ws");
const { v4: uuidv4 } = require("uuid");
const { handleMessage } = require("./roomController.js");

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', ws => {
    const uuid = uuidv4();
    console.log("New connection:", uuid)

    ws.on('close', () => console.log("Connection closed"));

    ws.on('error', e => console.error("Error:", e));

    ws.on('message', message => {
        handleMessage(ws, uuid, message)
    });
})

console.log("Running on port 8080...")