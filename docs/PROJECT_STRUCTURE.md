# 🏗️ Project Structure Guide

This document outlines the recommended project structure for the DIVER NEST booking system implementation.

## 📁 Recommended Directory Structure

```
diver-nest/
├── 📄 README.md                    # Main project documentation
├── 📄 LICENSE                      # Project license
├── 📄 .gitignore                   # Git ignore rules
├── 📄 package.json                 # Node.js dependencies (when implemented)
├── 📄 .env.example                 # Environment variables template
│
├── 📁 docs/                        # Project documentation
│   ├── 📄 DOCS.md                  # Technical documentation
│   ├── 📄 Relationship Schema.md   # Database schema
│   ├── 📄 API_DOCUMENTATION.md     # API endpoint documentation
│   ├── 📄 DEPLOYMENT_GUIDE.md      # Deployment instructions
│   └── 📄 PROJECT_STRUCTURE.md     # This file
│
├── 📁 src/                         # Source code (future implementation)
│   ├── 📁 frontend/                # React/Vue.js frontend
│   │   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 pages/               # Application pages
│   │   ├── 📁 hooks/               # Custom React hooks
│   │   ├── 📁 services/            # API service functions
│   │   ├── 📁 utils/               # Utility functions
│   │   ├── 📁 styles/              # CSS/SCSS files
│   │   └── 📁 assets/              # Static assets
│   │
│   ├── 📁 backend/                 # Node.js backend
│   │   ├── 📁 controllers/         # Request handlers
│   │   ├── 📁 models/              # Database models
│   │   ├── 📁 routes/              # API routes
│   │   ├── 📁 middleware/          # Custom middleware
│   │   ├── 📁 services/            # Business logic services
│   │   ├── 📁 utils/               # Helper functions
│   │   ├── 📁 config/              # Configuration files
│   │   └── 📄 server.js            # Application entry point
│   │
│   └── 📁 shared/                  # Shared utilities/types
│       ├── 📁 constants/           # Application constants
│       ├── 📁 types/               # TypeScript type definitions
│       └── 📁 validators/          # Input validation schemas
│
├── 📁 tests/                       # Test files
│   ├── 📁 unit/                    # Unit tests
│   ├── 📁 integration/             # Integration tests
│   └── 📁 e2e/                     # End-to-end tests
│
├── 📁 scripts/                     # Build and deployment scripts
│   ├── 📄 build.sh                # Build script
│   ├── 📄 deploy.sh               # Deployment script
│   └── 📄 seed-db.js              # Database seeding script
│
├── 📁 config/                      # Configuration files
│   ├── 📄 database.js             # Database configuration
│   ├── 📄 auth.js                 # Authentication configuration
│   └── 📄 payment.js              # Payment gateway configuration
│
└── 📁 uploads/                     # File uploads (gitignored)
    ├── 📁 activities/              # Activity images
    ├── 📁 vehicles/                # Vehicle images
    ├── 📁 resorts/                 # Resort images
    └── 📁 invoices/                # Generated invoices
```

## 📋 File Naming Conventions

### Frontend Files
- **Components**: PascalCase (e.g., `BookingForm.jsx`, `ActivityCard.jsx`)
- **Pages**: PascalCase (e.g., `HomePage.jsx`, `BookingPage.jsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useBooking.js`, `useAuth.js`)
- **Services**: camelCase (e.g., `apiService.js`, `authService.js`)
- **Styles**: kebab-case (e.g., `booking-form.scss`, `activity-card.css`)

### Backend Files
- **Controllers**: camelCase with Controller suffix (e.g., `bookingController.js`)
- **Models**: PascalCase (e.g., `User.js`, `Booking.js`, `Activity.js`)
- **Routes**: camelCase (e.g., `authRoutes.js`, `bookingRoutes.js`)
- **Middleware**: camelCase (e.g., `authMiddleware.js`, `validationMiddleware.js`)
- **Services**: camelCase with Service suffix (e.g., `paymentService.js`)

### Database Files
- **Collections**: lowercase, plural (e.g., `users`, `activities`, `bookings`)
- **Fields**: snake_case (e.g., `user_id`, `created_at`, `total_amount`)

## 🎯 Implementation Guidelines

### Frontend Structure (React/Vue.js)

```javascript
// Example component structure
src/frontend/components/
├── common/                    # Reusable components
│   ├── Button/
│   ├── Modal/
│   ├── LoadingSpinner/
│   └── ErrorBoundary/
├── booking/                   # Booking-specific components
│   ├── BookingForm/
│   ├── BookingSummary/
│   └── BookingHistory/
├── activity/                  # Activity components
│   ├── ActivityCard/
│   ├── ActivityList/
│   └── ActivityDetails/
└── layout/                    # Layout components
    ├── Header/
    ├── Footer/
    ├── Sidebar/
    └── Navigation/
```

### Backend Structure (Node.js/Express)

```javascript
// Example API structure
src/backend/routes/
├── auth.js                    # Authentication routes
├── users.js                   # User management
├── activities.js              # Activity operations
├── vehicles.js                # Vehicle operations
├── resorts.js                 # Resort operations
├── courses.js                 # Course operations
├── bookings.js                # Booking operations
├── payments.js                # Payment processing
└── admin.js                   # Admin operations

// Controller structure
src/backend/controllers/
├── authController.js          # Login, register, logout
├── bookingController.js       # Booking CRUD operations
├── paymentController.js       # Payment processing
├── adminController.js         # Admin dashboard
└── resourceController.js      # Generic resource operations
```

## 🗄️ Database Organization

### MongoDB Collections
- **users** - User accounts and profiles
- **activities** - Diving activities and tours
- **vehicles** - Vehicle rental inventory
- **resorts** - Resort accommodation options
- **courses** - Training courses and certifications
- **activitybookings** - Activity reservation records
- **vehiclebookings** - Vehicle rental records
- **resortbookings** - Resort booking records
- **coursebookings** - Course enrollment records
- **payments** - Payment transaction records
- **invoices** - Generated invoices
- **refunds** - Refund processing records
- **contacts** - Customer inquiry records

### Collection Naming Strategy
- Use lowercase, plural nouns
- Separate words with no delimiter (e.g., `activitybookings` not `activity_bookings`)
- Keep names descriptive but concise

## 🔧 Configuration Management

### Environment Variables Structure
The application uses environment variables for configuration. Create a `.env` file based on `.env.example`:

```bash
# Database Configuration
MONGO_URI=your_mongodb_connection_string
DB_NAME=your_database_name

# Authentication Settings
JWT_SECRET=your_secure_jwt_secret_here
JWT_EXPIRE=7d
BCRYPT_ROUNDS=12

# Payment Gateway Keys (Use test keys for development)
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Email Service Configuration
EMAIL_SERVICE=your_email_provider
EMAIL_API_KEY=your_email_service_api_key
EMAIL_FROM=your_sender_email

# File Upload Settings
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Application Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

### Environment Variable Security Guidelines

⚠️ **IMPORTANT SECURITY NOTES:**
- **Never commit `.env` files to version control**
- **Use strong, unique secrets for JWT_SECRET**
- **Use test API keys during development**
- **Store production secrets in secure environment variable services**
- **Rotate secrets regularly in production**

### Recommended Environment Variable Management
- **Development**: Use `.env` file (gitignored)
- **Staging**: Use platform environment variable settings
- **Production**: Use secure secret management services (AWS Secrets Manager, Azure Key Vault, etc.)

## 📚 Documentation Standards

### Code Documentation
- Use JSDoc for function documentation
- Include parameter types and return types
- Document complex business logic
- Add inline comments for non-obvious code

### API Documentation
- Use OpenAPI/Swagger specification
- Document all endpoints with examples
- Include error response formats
- Provide authentication requirements

### Database Documentation
- Document all collections and fields
- Include relationship mappings
- Specify constraints and validations
- Provide sample documents

## 🧪 Testing Structure

### Test Organization
```
tests/
├── unit/                      # Individual function tests
│   ├── controllers/           # Controller unit tests
│   ├── models/                # Model unit tests
│   ├── services/              # Service unit tests
│   └── utils/                 # Utility function tests
├── integration/               # API endpoint tests
│   ├── auth.test.js           # Authentication flow tests
│   ├── booking.test.js        # Booking process tests
│   └── payment.test.js        # Payment processing tests
└── e2e/                       # Full user journey tests
    ├── customer-journey.test.js
    ├── admin-workflow.test.js
    └── booking-flow.test.js
```

## 🚀 Deployment Structure

### Production Environment
```
production/
├── nginx/                     # Web server configuration
├── docker/                    # Container definitions
├── scripts/                   # Deployment scripts
├── monitoring/                # Logging and monitoring
└── backups/                   # Database backup scripts
```

## 📖 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/alen-oshan/diver-nest.git
   cd diver-nest
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up database**
   ```bash
   npm run seed-db
   ```

5. **Start development**
   ```bash
   npm run dev
   ```

---

This structure provides a solid foundation for implementing the DIVER NEST booking system while maintaining clean, organized, and scalable code architecture.

**Last Updated:** January 5, 2026  
**Maintained By:** DIVER NEST Development Team