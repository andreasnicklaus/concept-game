const http = require("http");
const { WebSocketServer } = require("ws");
const { v4: uuidv4 } = require("uuid");
const { handleMessage } = require("./roomController.js");

const PORT = process.env.PORT || 8080;
const STARTED_AT = new Date();

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (req.method === "GET" && url.pathname === "/health") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ status: "ok" }));
        return;
    }

    if (req.method === "GET" && url.pathname === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(`Running since ${STARTED_AT.toISOString()}`);
        return;
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
    const uuid = uuidv4();
    console.log("New connection:", uuid)

    ws.on('close', () => console.log("Connection closed"));

    ws.on('error', e => console.error("Error:", e));

    ws.on('message', message => {
        handleMessage(ws, uuid, message)
    });
})

server.listen(PORT, () => {
    console.log("Running on port", PORT, "...")
})