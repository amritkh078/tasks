const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//set stactic folder
app.use(express.static(__dirname + "/public"));

const botName = "Chat Bot";

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.emit("message", formatMessage(botName, "Welcome to Chat!"));
    socket.broadcast
      .to(user.room)
      .emit("message", formatMessage(botName, `${user.username} has joined the chat`));

      // send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
  });

  // listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
  // client disconnect
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
        io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat`));

        // send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    }
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
