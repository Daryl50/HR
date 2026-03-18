import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function JobDetail() {
  const [job, setJob] = useState(null)
  const [resume, setResume] = useState('')
  const [cover, setCover] = useState('')
  const router = useRouter()
  const { id } = router.query
  useEffect(()=>{ if (!id) return; fetch(`/api/jobs/${id}`).then(r=>r.json()).then(setJob) }, [id])

  async function apply(e) {
    e.preventDefault()
    // For demo we assume userId=1; replace with real auth in production
    const res = await fetch(`/api/jobs/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 1, resume, coverNote: cover }) })
    if (res.ok) alert('Applied')
    else alert('Apply failed')
  }

  if (!job) return <div>Loading...</div>
  return (
    <div style={{ padding: 20 }}>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <h3>Apply</h3>
      <form onSubmit={apply}>
        <textarea placeholder="Paste resume text" value={resume} onChange={e=>setResume(e.target.value)} />
        <br />
        <textarea placeholder="Cover note" value={cover} onChange={e=>setCover(e.target.value)} />
        <br />
        <button type="submit">Apply</button>
      </form>
    </div>
  )
}
