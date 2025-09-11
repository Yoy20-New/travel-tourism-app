# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development Setup
```bash
# Clone and setup
git clone <repository-url>
cd travel-tourism-app

# Environment setup
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Install dependencies (run in separate terminals)
cd backend && npm install
cd frontend && npm install
```

### Database Operations
```bash
# Database setup and migrations
cd backend
npm run db:migrate     # Run Prisma migrations
npm run db:generate    # Generate Prisma client
npm run db:seed        # Seed with sample data
npm run db:studio      # Open Prisma Studio GUI
npm run db:reset       # Reset database (destructive)
```

### Development Servers
```bash
# Start backend (Terminal 1)
cd backend
npm run dev            # Runs on localhost:5000

# Start frontend (Terminal 2)  
cd frontend
npm run dev            # Runs on localhost:3000

# Alternative: Docker Compose (full stack)
docker-compose up      # Starts all services
docker-compose up -d postgres redis  # Only database services
```

### Testing and Quality
```bash
# Backend
cd backend
npm test               # Run Jest tests
npm run test:watch     # Watch mode
npm run lint           # ESLint check
npm run lint:fix       # Auto-fix linting issues

# Frontend
cd frontend
npm test               # Run tests
npm run lint           # Next.js linting
npm run type-check     # TypeScript validation
```

### Build and Production
```bash
# Backend build
cd backend
npm run build          # Compile TypeScript
npm start              # Start production server

# Frontend build
cd frontend
npm run build          # Next.js production build
npm start              # Start production server
```

### Single Test Execution
```bash
# Run specific test file
cd backend
npx jest tests/auth.test.js

# Run tests matching pattern
npx jest --testNamePattern="user login"
```

## Architecture Overview

### High-Level Structure
This is a full-stack travel and tourism application with a clear separation between frontend (Next.js), backend (Node.js/Express), and database (PostgreSQL). The application focuses on trip data capture, cultural insights, guide booking, and subscription services.

### Core Domain Models
The application is built around these key entities:
- **Users**: Authentication, roles (USER/ADMIN/GUIDE), profile management
- **Trips**: Trip chains with origin/destination tracking, companions, transport modes
- **Guides**: Professional guide profiles with availability, booking system, ratings
- **Packages**: Subscription-based travel packages (seasonal, cultural, festival)
- **Cultural Sites**: Hidden gems, historical sites, caves with cultural insights
- **Bookings**: Guide booking system with payment integration

### Backend Architecture (`/backend`)
- **Prisma ORM**: Database schema and migrations in `prisma/schema.prisma`
- **Route Structure**: RESTful APIs organized by domain (`/routes/`)
  - `/auth` - Authentication and user management
  - `/trips` - Trip data capture and management  
  - `/guides` - Guide profiles and availability
  - `/bookings` - Guide booking system
  - `/packages` - Subscription packages
  - `/cultural-sites` - Cultural site discovery
  - `/admin` - Admin dashboard and analytics
- **Middleware**: Error handling, logging, authentication, rate limiting
- **Services Layer**: Business logic separation from route handlers

### Frontend Architecture (`/frontend`)
- **Next.js 14**: App Router with TypeScript
- **State Management**: Zustand for global state
- **Form Handling**: React Hook Form + Zod validation
- **Maps Integration**: Mapbox GL JS for interactive cultural site discovery
- **Styling**: Tailwind CSS with Headless UI components
- **Authentication**: JWT token management with automatic refresh

### Database Design Patterns
- **UUID Primary Keys**: All models use UUID for security and scalability
- **Soft Relationships**: Companion data cascades with trip deletion
- **Enum Types**: Strongly typed transport modes, trip purposes, booking statuses
- **JSON Fields**: Flexible data storage for opening hours, features arrays
- **Indexing Strategy**: Optimized for user queries, date ranges, geographical searches

### Key Integration Points
- **Mapbox**: Cultural site mapping and GPS-based origin detection
- **Stripe**: Subscription payments and guide booking transactions  
- **Cloudinary**: Image storage for guides, cultural sites, packages
- **SendGrid/SMTP**: Email notifications and OTP verification
- **Prisma**: Type-safe database operations with migration management

### Admin Dashboard Architecture
Separate interface for NATPAC scientists to:
- Filter and export trip datasets (CSV/Excel)
- Manage cultural sites and hidden gems
- Monitor guide performance and bookings
- Configure subscription packages and seasonal pricing
- View analytics with charts and real-time statistics

### Authentication Flow
- JWT-based authentication with refresh tokens
- Email/OTP verification system
- Role-based access control (USER/ADMIN/GUIDE)
- Rate limiting on sensitive endpoints
- Secure password hashing with bcrypt

### Data Flow Patterns
1. **Trip Capture**: GPS detection → form validation → Prisma storage → admin analytics
2. **Guide Booking**: Availability check → payment processing → confirmation → rating system
3. **Cultural Discovery**: Map interaction → site details → local insights → user reviews
4. **Subscription Management**: Package selection → Stripe payment → access control → auto-renewal

### Development Considerations
- Mobile-first responsive design approach
- PostgreSQL optimized for geographical queries
- Redis caching layer (optional) for performance
- Comprehensive error handling with Winston logging
- CORS configuration for cross-origin requests
- Input validation at both frontend and backend layers
