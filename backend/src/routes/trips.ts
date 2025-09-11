import { Router } from 'express'

const router = Router()

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Create trip endpoint stub' })
})

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Get trips endpoint stub' })
})

router.get('/:id', (req, res) => {
  res.json({ success: true, message: 'Get trip by ID endpoint stub' })
})

router.put('/:id', (req, res) => {
  res.json({ success: true, message: 'Update trip endpoint stub' })
})

router.delete('/:id', (req, res) => {
  res.json({ success: true, message: 'Delete trip endpoint stub' })
})

export default router
