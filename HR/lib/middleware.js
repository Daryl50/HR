const { verify } = require('./auth')

function getTokenFromReq(req) {
  const h = req.headers.authorization || req.headers.Authorization
  if (!h) return null
  const parts = h.split(' ')
  if (parts.length === 2 && parts[0] === 'Bearer') return parts[1]
  return null
}

async function requireAuth(req, res) {
  const token = getTokenFromReq(req)
  if (!token) {
    res.status(401).json({ error: 'Missing token' })
    return null
  }
  const payload = verify(token)
  if (!payload) {
    res.status(401).json({ error: 'Invalid token' })
    return null
  }
  return payload
}

module.exports = { requireAuth }
