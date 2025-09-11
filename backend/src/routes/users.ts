import { Router } from 'express'

const router = Router()

router.get('/profile', (req, res) => {
  res.json({ success: true, message: 'Get user profile endpoint stub' })
})

router.put('/profile', (req, res) => {
  res.json({ success: true, message: 'Update user profile endpoint stub' })
})

export default router
