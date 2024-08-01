import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Join.css'

const Join = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Join</h1>
        <div>
          <input
            value={name}
            placeholder='Name'
            className='joinInput'
            type='text'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='Room'
            className='joinInput'
            type='text'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => {
            if (!name || !room) {
              e.preventDefault()
            }
          }}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className='button' type='submit'>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Join
