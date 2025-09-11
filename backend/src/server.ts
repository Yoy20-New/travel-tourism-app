import app from './app'
import { env } from './config/env'

const port = env.PORT || 5000

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`)
})

