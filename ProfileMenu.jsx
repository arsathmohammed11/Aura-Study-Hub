import React, { useState, useRef, useEffect } from 'react'

export default function ProfileMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  if (!user) return null

  const initial = (user.name && user.name[0]) || (user.email && user.email[0]) || 'U'

  return (
    <div className="profile" ref={ref}>
      <button className="profile-btn" onClick={() => setOpen((s) => !s)} aria-haspopup="true">
        <span className="avatar">{initial.toUpperCase()}</span>
      </button>

      {open && (
        <div className="profile-dropdown">
          <div className="profile-info">
            <div className="profile-name">{user.name || 'User'}</div>
            <div className="profile-email">{user.email}</div>
          </div>
          <div className="profile-actions">
            <button onClick={() => { setOpen(false); onLogout && onLogout() }}>Sign out</button>
          </div>
        </div>
      )}
    </div>
  )
}
