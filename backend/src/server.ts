import app from './app'
import { env } from './config/env'
import connectDB from './config/database'

const port = env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`API server running on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error('Failed to start server due to DB error:', err)
    process.exit(1)
  })
