import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Pentecost University HR</h1>
      <nav>
        <ul>
          <li><Link href="/jobs">Jobs</Link></li>
          <li><Link href="/signup">Sign up</Link></li>
          <li><Link href="/login">Log in</Link></li>
        </ul>
      </nav>
    </div>
  )
}
