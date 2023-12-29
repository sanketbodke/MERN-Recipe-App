import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <div className="logo">
        <h1>RECIPE APP</h1>
      </div>
      <div style={{display: 'flex', gap: '20px'}}>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">create recipes</Link>
        <Link to="/saved-recipes">saved recipes</Link>
        <Link to="/auth">login/register</Link>
      </div>
    </div>
  )
}
