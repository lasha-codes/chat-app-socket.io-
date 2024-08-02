/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket
const Chat = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search)
    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, ({ error }) => {
      alert(error)
    })

    return () => {
      socket.off()
    }
  }, [ENDPOINT, window.location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(message, messages)

  return (
    <div className='outerContainer'>
      <div className='container'>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat
