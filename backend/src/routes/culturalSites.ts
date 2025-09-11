import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Get cultural sites endpoint stub' })
})

router.get('/:id', (req, res) => {
  res.json({ success: true, message: 'Get cultural site by ID endpoint stub' })
})

router.get('/nearby', (req, res) => {
  res.json({ success: true, message: 'Get nearby cultural sites endpoint stub' })
})

export default router
