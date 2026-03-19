import { useState } from 'react'
import Router from 'next/router'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  async function submit(e) {
    e.preventDefault()
    const res = await fetch('/api/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, name }) })
    const j = await res.json()
    if (res.ok && j.token) {
      localStorage.setItem('token', j.token)
      Router.push('/jobs')
    } else alert('Signup failed')
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Sign up</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <br />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <br />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <br />
        <button type="submit">Create account</button>
      </form>
    </div>
  )
}
