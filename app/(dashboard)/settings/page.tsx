'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="settings-page">
      <h1>Account Settings</h1>
      <p className="settings-desc">Manage your profile and preferences.</p>

      <div className="settings-section">
        <h2>Profile</h2>
        <div className="form-group">
          <label>Display Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <button
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={handleSave}
        >
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Email notification preferences coming soon.
        </p>
      </div>
    </div>
  )
}
