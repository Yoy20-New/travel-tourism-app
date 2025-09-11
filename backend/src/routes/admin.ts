import { Router } from 'express'

const router = Router()

router.get('/dashboard', (req, res) => {
  res.json({ success: true, message: 'Admin dashboard endpoint stub' })
})

router.get('/trips/export', (req, res) => {
  res.json({ success: true, message: 'Export trips endpoint stub' })
})

router.get('/analytics', (req, res) => {
  res.json({ success: true, message: 'Analytics endpoint stub' })
})

export default router
