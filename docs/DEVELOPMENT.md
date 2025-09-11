# Development Guide

This document provides comprehensive instructions for setting up and running the Travel & Tourism web application locally.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 15+
- Git
- Docker and Docker Compose (optional)

## Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd travel-tourism-app
```

### 2. Environment Configuration

#### Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your values:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/travel_tourism_db"
JWT_SECRET="your-secure-jwt-secret"
# Add other required environment variables
```

#### Frontend Environment

```bash
cd ../frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

### 3. Database Setup

#### Option A: Using Docker Compose (Recommended)

```bash
# From project root
docker-compose up -d postgres redis

# Run migrations
cd backend
npm install
npm run db:migrate
npm run db:seed
```

#### Option B: Local PostgreSQL

```bash
# Create database
createdb travel_tourism_db

# Install dependencies and run migrations
cd backend
npm install
npm run db:migrate
npm run db:seed
```

### 4. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 5. Start Development Servers

#### Option A: Manual Start

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

#### Option B: Docker Compose (Full Stack)

```bash
# From project root
docker-compose up
```

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/health

## Development Workflow

### Database Changes

1. Modify `backend/prisma/schema.prisma`
2. Create migration: `npm run db:migrate`
3. Generate client: `npm run db:generate`
4. Restart backend server

### Adding New Features

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Add backend routes in `backend/src/routes/`
3. Add frontend components in `frontend/src/components/`
4. Update types in both projects
5. Test thoroughly
6. Commit and create PR

### Code Quality

```bash
# Backend linting
cd backend
npm run lint
npm run lint:fix

# Frontend linting
cd frontend
npm run lint
npm run type-check
```

## Available Scripts

### Backend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Check code style
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Check code style
- `npm run type-check` - TypeScript type checking

## Project Structure

```
travel-tourism-app/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   ├── lib/            # Utility libraries
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # State management
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Helper functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                  # Node.js/Express API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Helper functions
│   │   └── config/         # Configuration
│   ├── prisma/             # Database schema & migrations
│   └── package.json
├── database/                 # Database documentation
├── docs/                     # Project documentation
└── README.md
```

## Key Technologies

### Frontend
- **Next.js 14** - React framework with app router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Hook Form + Zod** - Form handling & validation
- **Mapbox GL JS** - Interactive maps

### Backend
- **Node.js + Express** - Server framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Joi** - Input validation
- **Winston** - Logging

## Testing

### Backend Tests

```bash
cd backend
npm test
npm run test:watch
```

### Frontend Tests

```bash
cd frontend
npm test
npm run test:watch
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment instructions.

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env
   - Run `npm run db:migrate`

2. **Frontend API Errors**
   - Verify backend is running on port 5000
   - Check NEXT_PUBLIC_API_URL in .env.local

3. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear Next.js cache: `rm -rf .next`

4. **Prisma Issues**
   - Generate client: `npm run db:generate`
   - Reset database: `npm run db:reset`

### Getting Help

- Check the [Issues](https://github.com/your-repo/travel-tourism-app/issues) page
- Review the project documentation
- Contact the development team

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Ensure all tests pass
6. Submit a pull request

For more details, see [CONTRIBUTING.md](./CONTRIBUTING.md).
