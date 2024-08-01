const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()

app.use(cors())
app.use(router)

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: 'http://localhost:5173' } })

io.on('connection', (socket) => {
  console.log('We have a new connection')

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room)

    const error = true

    // if (error) {
    // callback({ error: 'error' })
    // }
  })

  socket.on('disconnect', () => {
    console.log('User has been disconnected')
  })
})

server.listen(PORT, () => console.log('Server is running on port', PORT))
