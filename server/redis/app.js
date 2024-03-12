const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const app = express();
const server = http.createServer(app);

// Create Redis client
const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  const io = new Server(server);

  // Use the Redis adapter
  io.adapter(createAdapter(pubClient, subClient));

  // Socket.io events
  io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
      io.emit("message", message);
    });
  });

  app.use(express.static(path.resolve("./public")));

  app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
  });

  server.listen(9000, () => console.log(`Server Started at PORT:9000`));
});
