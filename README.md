# Travel & Tourism Web Application

A full-stack, responsive travel and tourism web application with innovative features for trip data capture, cultural insights, and guide booking.

## 🌟 Features

### Core Functionality
- **User Registration & Consent**: Secure user onboarding with consent screens
- **Trip Data Capture**: Record trip number, origin, time, mode of transport, destination
- **Companion Management**: Add accompanying travelers with details
- **Auto-Detection**: GPS origin detection and time auto-fill
- **Secure Storage**: Trip chains stored in backend database
- **Admin Dashboard**: NATPAC scientists can access, filter, and export trip datasets

### Innovative Features
- **Subscription Model**: Seasonal travel packages (festivals, peak times, off-season deals)
- **Cultural Insights**: Hidden cultural facts and local-only travel insights
- **Guide Booking**: Portal with guide profiles, ratings, and experience
- **Interactive Maps**: Hidden spots, caves, and cultural places discovery
- **Trip History**: Comprehensive user dashboard with trip analytics

## 🏗️ Architecture

```
travel-tourism-app/
├── frontend/          # Next.js frontend application
├── backend/           # Node.js/Express API server
├── database/          # PostgreSQL schema and migrations
├── docs/              # Documentation and guides
└── README.md          # This file
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS (responsive, mobile-first)
- **State Management**: Zustand
- **Maps**: Mapbox GL JS
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Headless UI + custom components

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with email/OTP
- **Payment**: Stripe integration
- **File Storage**: AWS S3 or Cloudinary
- **Email**: SendGrid or Nodemailer

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway, Render, or AWS
- **Database**: Supabase or AWS RDS
- **CDN**: Cloudflare

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd travel-tourism-app
```

2. **Install dependencies**
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Environment Setup**
```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

4. **Database Setup**
```bash
# Run database migrations
cd backend
npm run db:migrate
npm run db:seed
```

5. **Start Development Servers**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit `http://localhost:3000` for the frontend and `http://localhost:5000` for the API.

## 📱 UI/UX Guidelines

- **Design Theme**: Clean, minimal, cultural-travel inspired
- **Responsive**: Mobile-first approach with desktop, tablet, and mobile layouts
- **Navigation**: Simple and intuitive for trip logging, subscriptions, and guides
- **Admin Dashboard**: Separate interface with analytics, charts, and export options
- **Accessibility**: WCAG 2.1 AA compliance

## 🔐 Security Features

- JWT-based authentication
- Email/OTP verification
- Rate limiting on sensitive endpoints
- Input validation and sanitization
- HTTPS enforcement
- CORS configuration
- SQL injection protection

## 📊 Admin Dashboard Features

- Trip data analytics with charts and graphs
- User management and permissions
- Data filtering and search
- CSV/Excel export functionality
- Real-time statistics
- Guide and package management

## 🗺️ Map Features

- Interactive cultural sites discovery
- Hidden spots and caves mapping
- GPS-based location services
- Custom markers for different location types
- Offline map support
- Route planning integration

## 🎯 Development Roadmap

- [ ] Phase 1: Core functionality (auth, trip capture, basic admin)
- [ ] Phase 2: Subscription system and packages
- [ ] Phase 3: Guide booking and ratings
- [ ] Phase 4: Interactive maps and cultural insights
- [ ] Phase 5: Mobile app development
- [ ] Phase 6: Advanced analytics and AI recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@travelapp.com or create an issue in this repository.
