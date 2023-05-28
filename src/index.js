const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 4999
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0;

io.on('connection', (socket) => {
  console.log('Socket connected');

  socket.broadcast.emit('message', 'A new user has joined')

  socket.on('send-message', (message) => {
    io.emit('message-sent', (message))
  })

  socket.on('send-location', (locationData) => {
    io.emit('message', (`https://google.com/maps?q=${locationData.latitude},${locationData.longitude}`))
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user left')
  })
})

server.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})