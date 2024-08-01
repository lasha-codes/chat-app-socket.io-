/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

const Chat = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search)
    const socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, ({ error }) => {
      alert(error)
    })

    return () => {
      socket.off()
    }
  }, [ENDPOINT, window.location.search])

  return <div>Chat</div>
}

export default Chat
