import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Please enter email and password')
      return
    }

    setLoading(true)
    try {
      // Simulate a request
      await new Promise((r) => setTimeout(r, 600))
      // In a real app verify credentials here. We'll accept any non-empty input.
      if (onLogin) onLogin({ email })
    } catch (err) {
      setError('Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card login-card">
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="field">
          <div className="label">Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="username"
          />
        </label>

        <label className="field">
          <div className="label">Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
          />
        </label>

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button type="submit" disabled={loading}>{loading ? 'Signing…' : 'Sign in'}</button>
        </div>
      </form>
    </div>
  )
}
