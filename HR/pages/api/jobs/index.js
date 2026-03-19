const prisma = require('../../../lib/prisma')
const { requireAuth } = require('../../../lib/middleware')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const jobs = await prisma.job.findMany({ orderBy: { createdAt: 'desc' } })
    return res.json(jobs)
  }

  if (req.method === 'POST') {
    const user = await requireAuth(req, res)
    if (!user) return
    const allowed = ['HR_MANAGER', 'ADMIN_A', 'ADMIN_B']
    if (!allowed.includes(user.role)) return res.status(403).json({ error: 'Forbidden' })

    const { title, department, description } = req.body
    if (!title || !description) return res.status(400).json({ error: 'Missing fields' })
    const job = await prisma.job.create({ data: { title, department, description } })
    return res.status(201).json(job)
  }

  res.status(405).end()
}
