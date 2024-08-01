const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()

app.use(cors())
app.use(router)

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: 'http://localhost:5173' } })

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) {
      return callback({ error })
    }

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
    })

    socket.join(user.room)
  })

  socket.on('disconnect', () => {
    console.log('User has been disconnected')
  })
})

server.listen(PORT, () => console.log('Server is running on port', PORT))
