import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  useEffect(()=>{ fetch('/api/jobs').then(r=>r.json()).then(setJobs) }, [])
  return (
    <div style={{ padding: 20 }}>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map(j=> (
          <li key={j.id}><Link href={`/jobs/${j.id}`}>{j.title} - {j.department || 'General'}</Link></li>
        ))}
      </ul>
    </div>
  )
}
