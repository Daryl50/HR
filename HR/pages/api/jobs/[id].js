const prisma = require('../../../lib/prisma')

export default async function handler(req, res) {
  const { id } = req.query
  if (req.method === 'GET') {
    const job = await prisma.job.findUnique({ where: { id: Number(id) } })
    if (!job) return res.status(404).json({ error: 'Not found' })
    return res.json(job)
  }

  if (req.method === 'POST') {
    // apply to job
    const { userId, resume, coverNote } = req.body
    if (!userId) return res.status(400).json({ error: 'Missing userId' })
    const application = await prisma.application.create({ data: { userId: Number(userId), jobId: Number(id), resume, coverNote } })
    return res.status(201).json(application)
  }

  res.status(405).end()
}
