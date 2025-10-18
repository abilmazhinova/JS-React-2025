import React from 'react'
import './CharacterCard.css'

export default function CharacterCard({ character }) {
  const avatarUrl = `https://robohash.org/${character.id}?size=100x100`

  return (
    <li className="character-card">
      <img src={avatarUrl} alt={character.name} className="avatar" />
      <div className="info">
        <h3>{character.name}</h3>
        <p className="username">@{character.username}</p>
        <p className="email">{character.email}</p>
        <p className="company">{character.company?.name}</p>
      </div>
    </li>
  )
}
