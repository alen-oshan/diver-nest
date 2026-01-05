# 🏊‍♂️ DIVER NEST - Diving Centre Booking System

> A comprehensive MERN-stack based booking management system for diving centers, designed to handle activity bookings, vehicle rentals, resort accommodations, and course registrations.

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🏗️ System Architecture](#️-system-architecture)
- [📚 Documentation](#-documentation)
- [🚀 Getting Started](#-getting-started)
- [📊 Database Design](#-database-design)
- [🔗 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🎯 Project Overview

Diver Nest is a complete booking management solution designed specifically for diving centers and marine tourism businesses. The system enables seamless booking of:

- 🏊 **Diving Activities** - Guided dives, snorkeling tours, underwater photography
- 🚗 **Vehicle Rentals** - Transport to diving locations
- 🏨 **Resort Bookings** - Accommodation management
- 📚 **Course Registration** - Diving certification courses (PADI, NAUI, etc.)

## ✨ Features

### Customer Features
- 🔍 Browse and search available services
- 📅 Real-time availability checking
- 🛒 Multi-item booking (group checkout)
- 💳 Secure payment processing (Stripe/PayPal)
- 📧 Automated email confirmations
- 📱 Responsive web interface

### Admin Features
- 📊 Comprehensive dashboard
- 📈 Booking management and tracking
- 💰 Financial reporting and analytics
- 🔄 Refund processing
- 👥 Customer management
- 📋 Resource availability management

### System Features
- 🔐 JWT-based authentication
- 🧾 Automated invoice generation
- 💸 Refund management system
- 📞 Customer contact management
- 🔄 Real-time status updates
- 📊 Comprehensive audit trails

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│  (React/Vue)    │◄───│  (Node.js/      │◄───│   (MongoDB)     │
│                 │    │   Express)      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Interface│    │   REST APIs     │    │  Document Store │
│   Components    │    │   Middleware    │    │   Collections   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Tech Stack:**
- **Frontend:** React.js/Vue.js with responsive design
- **Backend:** Node.js with Express.js framework
- **Database:** MongoDB for flexible document storage
- **Authentication:** JWT tokens with role-based access
- **Payments:** Stripe and PayPal integration
- **Email:** Automated email service integration

## 📚 Documentation

This repository contains comprehensive documentation to guide development:

| Document | Description | Status |
|----------|-------------|--------|
| [`docs/DOCS.md`](./docs/DOCS.md) | System overview, architecture, and workflows | ✅ Complete |
| [`docs/Relationship Schema.md`](./docs/Relationship%20Schema.md) | Detailed database schema and relationships | ✅ Complete |

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/alen-oshan/diver-nest.git

# Navigate to project directory
cd diver-nest

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

```env
MONGO_URI=mongodb://localhost:27017/divernest
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=your_stripe_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
EMAIL_SERVICE_API_KEY=your_email_api_key
```

## 📊 Database Design

The system uses MongoDB with the following main collections:

- **Users** - Customer and admin accounts
- **Activities** - Diving experiences and tours
- **Vehicles** - Transportation options
- **Resorts** - Accommodation facilities
- **Courses** - Training and certification programs
- **Bookings** - Reservation records (by type)
- **Payments** - Transaction processing
- **Invoices** - Billing documents
- **Refunds** - Return processing
- **Contacts** - Customer inquiries

For detailed schema information, see [`docs/Relationship Schema.md`](./docs/Relationship%20Schema.md).

## 🔗 API Documentation

RESTful API endpoints follow standard HTTP conventions:

```
GET    /api/activities     # List all activities
POST   /api/bookings      # Create new booking
PUT    /api/bookings/:id  # Update booking
DELETE /api/bookings/:id  # Cancel booking
```

*Full API documentation will be added in future updates.*

## 🤝 Contributing

This is a design and planning repository. For implementation contributions:

1. 🍴 Fork the repository
2. 🌟 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💻 Commit your changes (`git commit -m 'Add some amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

## 📄 License

This project is licensed under the terms specified in the [LICENSE](./LICENSE) file.

---

**Project Status:** 🏗️ Design & Planning Phase  
**Maintainer:** [@alen-oshan](https://github.com/alen-oshan)  
**Last Updated:** January 5, 2026
