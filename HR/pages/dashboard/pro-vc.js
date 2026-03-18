import { useEffect, useState } from 'react'
import Router from 'next/router'

export default function ProVCDashboard() {
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) { Router.push('/login'); return }
    fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.json()).then(j=>{
      if (!j.user || j.user.role !== 'PRO_VC') Router.replace('/')
      else setUser(j.user)
    })
  }, [])
  if (!user) return <div>Loading...</div>
  return (
    <div style={{ padding: 20 }}>
      <h2>Pro VC Dashboard</h2>
      <p>Welcome, {user.email}</p>
      <p>Actions: review high-level metrics, approve strategic hires</p>
    </div>
  )
}
