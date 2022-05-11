import { WebSocketServer } from "ws";
import {v4 as uuidv4} from "uuid"
import {handleMessage} from "./roomController.js";

const wss = new WebSocketServer({port: 8080})

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