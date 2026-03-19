import { useEffect, useState } from 'react'
import Router from 'next/router'

export default function HRManagerDashboard() {
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) { Router.push('/login'); return }
    fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.json()).then(j=>{
      if (!j.user || j.user.role !== 'HR_MANAGER') Router.replace('/')
      else setUser(j.user)
    })
  }, [])
  if (!user) return <div>Loading...</div>
  return (
    <div style={{ padding: 20 }}>
      <h2>HR Manager Dashboard</h2>
      <p>Welcome, {user.email}</p>
      <p>Actions: post jobs, review applications, schedule interviews</p>
    </div>
  )
}
