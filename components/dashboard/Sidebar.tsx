'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', pathname: '/',          icon: '▣' },
  { label: 'Products',  href: '/products', pathname: '/products',  icon: '◻' },
  { label: 'Settings',  href: '/settings', pathname: '/settings',  icon: '⚙' },
]

export default function Sidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'user-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.location.href = '/login'
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">N</div>
        <span className="logo-text">Nexus</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${pathname === item.pathname ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          ⎋ Sign Out
        </button>
      </div>
    </aside>
  )
}
