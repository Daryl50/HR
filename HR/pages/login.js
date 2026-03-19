import { useState } from 'react'
import Router from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e) {
    e.preventDefault()
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
    const j = await res.json()
    if (res.ok && j.token) {
      localStorage.setItem('token', j.token)
      Router.push('/jobs')
    } else alert('Login failed')
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Log in</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <br />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}
