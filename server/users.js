let users = []

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  const existingUser = users.find((user) => {
    return user.room === room && user.name === name
  })

  if (existingUser) {
    return { error: 'Username is taken' }
  }

  const user = { id, name, room }

  users.push(user)

  console.log(users)
  return { user }
}

const removeUser = (id) => {
  const index = users.findIndex((user) => {
    user.id === id
  })

  if (index !== -1) {
    users = users.filter((user, idx) => {
      return idx !== index
    })
  }
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room)
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom }
