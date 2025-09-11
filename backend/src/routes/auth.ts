import { Router } from 'express'

const router = Router()

router.post('/register', (req, res) => {
  // TODO: implement registration with email/OTP
  res.json({ success: true, message: 'Register endpoint stub' })
})

router.post('/login', (req, res) => {
  // TODO: implement OTP login and JWT issuance
  res.json({ success: true, message: 'Login endpoint stub' })
})

router.post('/verify-otp', (req, res) => {
  res.json({ success: true, message: 'Verify OTP endpoint stub' })
})

router.post('/refresh-token', (req, res) => {
  res.json({ success: true, message: 'Refresh token endpoint stub' })
})

export default router

