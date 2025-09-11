import { Router } from 'express'

const router = Router()

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Create booking endpoint stub' })
})

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Get bookings endpoint stub' })
})

router.get('/:id', (req, res) => {
  res.json({ success: true, message: 'Get booking by ID endpoint stub' })
})

export default router
