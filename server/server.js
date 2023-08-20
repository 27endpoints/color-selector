const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { MongoClient } = require("mongodb");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const mongoClient = new MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(__dirname + "/../client"));

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("changeColor", async (color) => {
    try {
      await mongoClient.connect();
      const db = mongoClient.db("myDatabase");
      const collection = db.collection("myCollection");

      await collection.insertOne({
        color: color,
      });

      io.emit("changeColor", color);
    } catch (err) {
      console.error(err);
    } finally {
      mongoClient.close();
    }
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
