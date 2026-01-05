# 📚 DIVER NEST - Technical Documentation

> Comprehensive system documentation for the Diving Centre Booking System

## 📋 Table of Contents

- [📊 Entity Relationship Overview](#-entity-relationship-overview)
- [💾 Database Schema Design](#-database-schema-design)
- [🏗️ System Architecture](#️-system-architecture)
- [👥 User Flow Diagrams](#-user-flow-diagrams)
- [📝 Booking Workflow](#-booking-workflow)
- [💳 Payment & Financial Workflow](#-payment--financial-workflow)
- [🔐 Authentication & Security](#-authentication--security)
- [📱 API Endpoints](#-api-endpoints)
- [⚡ Performance Considerations](#-performance-considerations)

---

## 📊 Entity Relationship Overview

### Core Entities

The system is built around 10 main entities with clearly defined relationships:

```
User ──▶ Booking ──▶ Payment ──▶ Invoice
         │           │
         │           ▼
         │        Refund
         │
         ▼
    [Activities, Vehicles, Resorts, Courses]
```

### Entity Relationships

- **Users** make multiple **Bookings** (1:N)
- **Bookings** can include multiple items: Activities, Vehicles, Resorts, Courses (N:M)
- **Bookings** generate **Payments** (1:1)
- **Payments** create **Invoices** (1:1)
- **Refunds** can reverse **Payments** (N:1)
- **Users** can submit multiple **Contacts** (1:N)

---

## 💾 Database Schema Design

### MongoDB Collections

#### 👤 Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  phone: String,
  role: Enum(['admin', 'staff', 'customer']),
  passwordHash: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

#### 🗓️ Bookings Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  items: [{
    type: Enum(['activity', 'vehicle', 'resort', 'course']),
    itemId: ObjectId,
    quantity: Number,
    priceAtBooking: Decimal,
    dates: {
      start: DateTime,
      end: DateTime
    }
  }],
  totalAmount: Decimal,
  status: Enum(['pending', 'confirmed', 'cancelled', 'completed']),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

#### 🏊 Activity Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: Text,
  date: DateTime,
  price: Decimal(10,2),
  totalSeats: Number,
  availableSeats: Number,
  status: Enum(['available', 'full', 'cancelled']),
  images: [String], // URLs
  location: String,
  duration: Number, // minutes
  difficulty: Enum(['beginner', 'intermediate', 'advanced'])
}
```

#### 🚗 Vehicle Collection
```javascript
{
  _id: ObjectId,
  vehicleNumber: String (unique),
  brand: String,
  model: String,
  seatCapacity: Number,
  type: String,
  city: String,
  pricePerDay: Decimal,
  status: Enum(['available', 'booked', 'maintenance']),
  features: [String],
  images: [String]
}
```

#### 🏨 Resort Collection
```javascript
{
  _id: ObjectId,
  name: String,
  location: String,
  pricePerNight: Decimal(10,2),
  totalRooms: Number,
  availableRooms: Number,
  status: Enum(['available', 'fully_booked']),
  images: [String],
  amenities: [String],
  roomTypes: [{
    type: String,
    capacity: Number,
    price: Decimal
  }]
}
```

#### 📚 Course Collection
```javascript
{
  _id: ObjectId,
  name: String,
  agency: String, // PADI, NAUI, SSI, etc.
  level: Enum(['beginner', 'intermediate', 'advanced']),
  durationDays: Number,
  price: Decimal(10,2),
  maxStudents: Number,
  status: Enum(['available', 'completed', 'cancelled']),
  startDate: DateTime,
  endDate: DateTime,
  instructor: String,
  certification: String
}
```

#### 💳 Payment Collection
```javascript
{
  _id: ObjectId,
  bookingId: ObjectId (ref: Bookings),
  userId: ObjectId (ref: Users),
  amount: Decimal(10,2),
  currency: String,
  method: Enum(['stripe', 'paypal', 'bank_transfer']),
  status: Enum(['pending', 'completed', 'failed', 'refunded']),
  transactionRef: String,
  gatewayResponse: Object,
  createdAt: DateTime,
  completedAt: DateTime
}
```

#### 🧾 Invoice Collection
```javascript
{
  _id: ObjectId,
  paymentId: ObjectId (ref: Payments),
  invoiceNumber: String (unique),
  issuedDate: DateTime,
  dueDate: DateTime,
  subtotal: Decimal,
  taxAmount: Decimal,
  totalAmount: Decimal,
  status: Enum(['issued', 'paid', 'cancelled']),
  items: [{
    description: String,
    quantity: Number,
    unitPrice: Decimal,
    total: Decimal
  }]
}
```

#### 💸 Refund Collection
```javascript
{
  _id: ObjectId,
  paymentId: ObjectId (ref: Payments),
  amount: Decimal(10,2),
  reason: Text,
  status: Enum(['requested', 'approved', 'processed', 'rejected']),
  requestedBy: ObjectId (ref: Users),
  processedBy: ObjectId (ref: Users),
  requestedAt: DateTime,
  processedAt: DateTime
}
```

#### 📞 Contact Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: Text,
  status: Enum(['new', 'read', 'replied', 'closed']),
  priority: Enum(['low', 'medium', 'high']),
  assignedTo: ObjectId (ref: Users),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

## 🏗️ System Architecture

### Microservices Design

```
┌───────────────────────┐
│     API Gateway         │
│   (Authentication &    │
│     Rate Limiting)     │
└─────────┬─────────────┘
         │
    ┌────┼────┐
    │         │         │
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│ User   │ │Booking│ │Payment│
│Service│ │Service│ │Service│
└───────┘ └───────┘ └───────┘
```

### Design Goals

- **Scalability:** Microservices architecture for independent scaling
- **Maintainability:** Clear separation of concerns and modular design
- **Reliability:** Robust error handling and data validation
- **Performance:** Optimized queries and caching strategies
- **Security:** JWT authentication and role-based access control

---

## 👥 User Flow Diagrams

### Customer Journey

```
🌍 Browse Services → 🔍 Search & Filter → 📅 Check Availability
         │                      │                      │
         ▼                      ▼                      ▼
🛒 Select Items ←─────── 📝 View Details ←─────── ✅ Confirm Dates
         │                                              │
         ▼                                              ▼
📋 Review Booking → 💳 Payment Processing → 📧 Confirmation
```

### Admin Workflow

```
📊 Dashboard → 📈 View Reports → 📝 Manage Resources
      │               │                │
      ▼               ▼                ▼
 👥 Users ←─────── 💰 Financials ←─── 🗺️ Bookings
```

### Authentication Flow

```
🔑 Login/Register → 🛡️ JWT Token → 🔐 Protected Routes
       │                    │                   │
       ▼                    ▼                   ▼
  📝 Validation ←─────── ⏰ Expiry Check ←─── ⚙️ Role Check
```

---

## 📝 Booking Workflow

### Step-by-Step Process

#### 1. 🔍 Resource Selection
- User browses available resources (activities/vehicles/resorts/courses)
- System displays real-time availability
- User selects desired items and dates

#### 2. ✔️ Availability Validation
- System checks resource availability for selected dates
- Validates capacity constraints
- Returns available slots or suggests alternatives

#### 3. 🗓️ Booking Creation
- Creates pending booking document
- Reserves resources temporarily (15-minute hold)
- Calculates total pricing including taxes

#### 4. 💳 Payment Processing
- User proceeds to payment
- Integration with Stripe/PayPal
- Real-time payment verification

#### 5. ✅ Confirmation
- Updates booking status to 'confirmed'
- Updates resource availability
- Generates invoice
- Sends email confirmation

### Booking States

| State | Description | Actions Available |
|-------|-------------|------------------|
| `pending` | Awaiting payment | Pay, Cancel |
| `confirmed` | Payment successful | View, Modify, Cancel |
| `cancelled` | Booking cancelled | View, Rebook |
| `completed` | Service delivered | View, Review |

---

## 💳 Payment & Financial Workflow

### Group Checkout System

```
🛒 Multiple Items → 📊 Single Transaction → 🧾 Unified Invoice
      │                      │                        │
      ▼                      ▼                        ▼
  💰 Total Calc ←─────── 💳 Payment Gateway ←─── 📧 Notification
```

### Payment Flow Details

#### Payment Processing
1. **Pre-payment Validation**
   - Verify booking details
   - Calculate final amounts
   - Apply discounts/taxes

2. **Gateway Integration**
   - Stripe for card payments
   - PayPal for digital wallet
   - Webhook handling for status updates

3. **Post-payment Actions**
   - Update payment status
   - Generate invoice
   - Send confirmation emails
   - Update resource availability

#### Invoice Generation
- **Auto-generated** after successful payment
- **Includes:** All booking details, tax breakdown, payment info
- **Format:** PDF generation with company branding
- **Storage:** Linked to payment record

#### Refund Process
1. **Refund Request**
   - Admin-initiated or policy-based
   - Reason documentation required
   - Approval workflow

2. **Processing**
   - Gateway refund API calls
   - Partial or full refund support
   - Status tracking

3. **Completion**
   - Update booking status
   - Restore resource availability
   - Notification to customer

### Financial Status Tracking

| Status | Description | Next Actions |
|--------|-------------|-------------|
| `pending` | Payment initiated | Complete or timeout |
| `completed` | Payment successful | Generate invoice |
| `failed` | Payment failed | Retry or cancel booking |
| `refunded` | Money returned | Update booking status |

---

## 🔐 Authentication & Security

### JWT Token Management
- **Access Tokens:** Short-lived (1 hour)
- **Refresh Tokens:** Long-lived (7 days)
- **Role-based Claims:** Admin, Staff, Customer
- **Secure Storage:** httpOnly cookies

### Security Measures
- **Password Hashing:** bcrypt with salt
- **Rate Limiting:** API endpoint protection
- **Input Validation:** Joi schema validation
- **CORS Configuration:** Domain whitelist
- **SQL Injection Prevention:** Parameterized queries

---

## 📱 API Endpoints

### Authentication
```
POST   /api/auth/register    # User registration
POST   /api/auth/login       # User login
POST   /api/auth/refresh     # Token refresh
POST   /api/auth/logout      # User logout
```

### Bookings
```
GET    /api/bookings         # List user bookings
POST   /api/bookings         # Create booking
GET    /api/bookings/:id     # Get booking details
PUT    /api/bookings/:id     # Update booking
DELETE /api/bookings/:id     # Cancel booking
```

### Resources
```
GET    /api/activities       # List activities
GET    /api/vehicles         # List vehicles
GET    /api/resorts          # List resorts
GET    /api/courses          # List courses
GET    /api/:resource/:id    # Get resource details
```

### Payments
```
POST   /api/payments         # Process payment
GET    /api/payments/:id     # Get payment status
POST   /api/refunds          # Request refund
GET    /api/invoices/:id     # Download invoice
```

---

## ⚡ Performance Considerations

### Database Optimization
- **Indexing Strategy:** Compound indexes on frequently queried fields
- **Aggregation Pipelines:** Efficient data processing
- **Connection Pooling:** MongoDB connection management

### Caching Strategy
- **Redis Cache:** Frequently accessed data
- **CDN Integration:** Static asset delivery
- **Query Caching:** Expensive operation results

### Monitoring & Analytics
- **Performance Metrics:** Response times, throughput
- **Error Tracking:** Automated error reporting
- **User Analytics:** Booking patterns and trends

---

**Document Version:** 2.0  
**Last Updated:** January 5, 2026  
**Maintained By:** DIVER NEST Development Team
