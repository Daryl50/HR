const fetch = require('node-fetch')

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { textA, textB } = req.body
  if (!textA || !textB) return res.status(400).json({ error: 'Missing texts' })

  const key = process.env.OPENAI_API_KEY
  if (!key) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' })

  try {
    const bodyA = { model: 'text-embedding-3-small', input: textA }
    const bodyB = { model: 'text-embedding-3-small', input: textB }

    const rA = await fetch('https://api.openai.com/v1/embeddings', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` }, body: JSON.stringify(bodyA) })
    const jA = await rA.json()
    const rB = await fetch('https://api.openai.com/v1/embeddings', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` }, body: JSON.stringify(bodyB) })
    const jB = await rB.json()

    const embA = jA.data[0].embedding
    const embB = jB.data[0].embedding
    const score = cosine(embA, embB)
    res.json({ score })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
