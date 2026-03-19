const { requireAuth } = require('../../lib/middleware')

export default async function handler(req, res) {
  const user = await requireAuth(req, res)
  if (!user) return
  // return the token payload (id, email, role)
  res.json({ user })
}
