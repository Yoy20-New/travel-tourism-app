import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Get packages endpoint stub' })
})

router.get('/:id', (req, res) => {
  res.json({ success: true, message: 'Get package by ID endpoint stub' })
})

export default router
