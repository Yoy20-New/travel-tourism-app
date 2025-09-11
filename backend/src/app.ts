import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'

import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
import { requestLogger } from './middleware/requestLogger'

// Import routes
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import tripRoutes from './routes/trips'
import guideRoutes from './routes/guides'
import packageRoutes from './routes/packages'
import bookingRoutes from './routes/bookings'
import adminRoutes from './routes/admin'
import culturalSiteRoutes from './routes/culturalSites'

const app = express()

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))

// CORS configuration
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW * 60 * 1000, // Convert minutes to milliseconds
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(compression())

// Request logging
if (env.NODE_ENV !== 'test') {
  app.use(requestLogger)
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Travel & Tourism API is running',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  })
})

// API routes
const apiRouter = express.Router()

apiRouter.use('/auth', authRoutes)
apiRouter.use('/users', userRoutes)
apiRouter.use('/trips', tripRoutes)
apiRouter.use('/guides', guideRoutes)
apiRouter.use('/packages', packageRoutes)
apiRouter.use('/bookings', bookingRoutes)
apiRouter.use('/admin', adminRoutes)
apiRouter.use('/cultural-sites', culturalSiteRoutes)

app.use(`/api/${env.API_VERSION}`, apiRouter)

// 404 handler
app.use(notFound)

// Global error handler
app.use(errorHandler)

export default app
