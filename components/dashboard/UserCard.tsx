'use client'

import { useState, useEffect } from 'react'
import type { User } from '@/lib/types'

interface UserCardProps {
  userId: string
}

export default function UserCard({ userId }: UserCardProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser)
      .catch(console.error)
  }, [])

  if (!user) return <div className="user-card skeleton" />

  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.profile.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="user-name">{user.profile.name}</p>
        <p className="user-email">{user.email}</p>
        <span className={`role-badge role-${user.role}`}>{user.role}</span>
      </div>
    </div>
  )
}
