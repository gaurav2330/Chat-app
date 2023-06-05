const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage } = require('./utils/messages')
const { addUser, getUser,removeUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const filter = new Filter()

const port = process.env.PORT || 4999
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
  console.log('Socket connected');

  //  Event to listen to send message

  socket.on('send-message', (message, callback) => {
    const user = getUser(socket.id)
    message = filter.clean(message)
    io.to(user.room).emit('message-sent', generateMessage(user.username, message))
    callback()
  })

  //  Event to listen to send location

  socket.on('send-location', (locationData, callback) => {
    const user = getUser(socket.id)
    io.emit('location-message', generateMessage(user.username, `https://google.com/maps?q=${locationData.latitude},${locationData.longitude}`))
    callback('Location Shared')
  })

  //  Event to join room

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options })

    if (error) {
      return callback(error)
    }

    socket.join(user.room)
    socket.broadcast.to(user.room).emit('message-sent', generateMessage('Admin', `${user.username} has joined`))
    io.to(user.room).emit('roomdata', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })

    callback()
  })

  //  Event to disconnect socket

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message-sent', generateMessage(`${user.username} has left`))

      io.to(user.room).emit('roomdata', {
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }
  })
})

  //  Server start

server.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})