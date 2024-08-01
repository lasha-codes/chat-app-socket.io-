const express = require('express')
const socket_io = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socket_io(server)

io.on('connection', (socket) => {
  console.log('We have a new connection')

  socket.on('disconnect', () => {
    console.log('User has been disconnected')
  })
})

app.use(router)

server.listen(PORT, () => console.log('Server is running on port', PORT))
