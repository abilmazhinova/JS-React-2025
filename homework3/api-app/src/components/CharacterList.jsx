import React, { useState } from 'react'
import CharacterCard from './CharacterCard'
import './CharacterList.css'

export default function CharacterList() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLoad = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setCharacters(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRestart = () => {
    window.location.reload()
  }

  return (
    <div className="character-list">
      <div className="buttons">
        <button
          className="load-btn"
          onClick={handleLoad}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load Characters'}
        </button>

        <button
          className="restart-btn"
          onClick={handleRestart}
        >
          Restart
        </button>
      </div>

      {error && <div className="error">Error: {error}</div>}

      <ul className="list-ul">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </ul>
    </div>
  )
}
