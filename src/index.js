const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const filter = new Filter()

const port = process.env.PORT || 4999
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
  console.log('Socket connected');

  socket.broadcast.emit('message', 'A new user has joined')

  socket.on('send-message', (message, callback) => {
    message = filter.clean(message)
    io.emit('message-sent', (message))
    callback()
  })

  socket.on('send-location', (locationData, callback) => {
    io.emit('location-message', (`https://google.com/maps?q=${locationData.latitude},${locationData.longitude}`))
    callback('Location Shared')
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user left')
  })
})

server.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})