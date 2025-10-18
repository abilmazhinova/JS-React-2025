import React, { useState, useEffect, useMemo } from 'react'
import CharacterCard from './CharacterCard'
import './CharacterList.css'

export default function CharacterList() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter characters based on search term
  const filteredCharacters = useMemo(() => 
    characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [characters, searchTerm]
  )

  // функционал который я добавила в этой лабе это автоматическое очищение поиска через 3 секунды, если нет результатов
  useEffect(() => {
    if (searchTerm && filteredCharacters.length === 0) {
      console.log('No results for search, clearing in 3 seconds...')
      
      const timer = setTimeout(() => {
        setSearchTerm('')
        console.log('Search cleared automatically')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [filteredCharacters.length, searchTerm])

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

  const handleClearSearch = () => {
    setSearchTerm('')
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

      {characters.length > 0 && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search characters by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-btn"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          )}
        </div>
      )}

      {error && <div className="error">Error: {error}</div>}

      <ul className="list-ul">
        {filteredCharacters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </ul>

      {characters.length > 0 && filteredCharacters.length === 0 && (
        <div className="no-results">
          No characters found matching "{searchTerm}"
          <br />
          <small>Search will clear automatically in 3 seconds...</small>
        </div>
      )}
    </div>
  )
}