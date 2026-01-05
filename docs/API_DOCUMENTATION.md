# 🔗 DIVER NEST - API Documentation

> RESTful API specification for the Diving Centre Booking System

## 📋 Table of Contents

- [🌟 API Overview](#-api-overview)
- [🔐 Authentication](#-authentication)
- [👤 User Management](#-user-management)
- [🎯 Resource Management](#-resource-management)
- [📅 Booking Operations](#-booking-operations)
- [💳 Payment Processing](#-payment-processing)
- [📧 Communication](#-communication)
- [⚙️ Admin Operations](#️-admin-operations)
- [📊 Error Handling](#-error-handling)
- [🔍 Response Examples](#-response-examples)

---

## 🌟 API Overview

### Base URL
```
Development: http://localhost:5000/api/v1
Production:  https://api.divernest.com/v1
```

### Content Type
All requests and responses use `application/json` content type.

### HTTP Methods
- `GET` - Retrieve data
- `POST` - Create new resource
- `PUT` - Update existing resource
- `PATCH` - Partial update
- `DELETE` - Remove resource

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

---

## 🔐 Authentication

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890",
  "role": "customer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64a7f8b9c123456789abcdef",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Refresh Token
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer {accessToken}
```

---

## 👤 User Management

### Get User Profile
```http
GET /users/profile
Authorization: Bearer {accessToken}
```

### Update User Profile
```http
PUT /users/profile
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "+1234567890"
}
```

### Change Password
```http
PATCH /users/password
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456"
}
```

---

## 🎯 Resource Management

### Activities

#### Get All Activities
```http
GET /activities?page=1&limit=10&status=available&date_from=2026-01-01
```

**Query Parameters:**
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 10, max: 50)
- `status` (string) - Filter by status: available, full, cancelled
- `date_from` (date) - Filter activities from date
- `date_to` (date) - Filter activities until date
- `search` (string) - Search in name and description

**Response:**
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "64a7f8b9c123456789abcdef",
        "name": "Coral Reef Diving",
        "description": "Explore vibrant coral reefs...",
        "date": "2026-01-15T09:00:00.000Z",
        "price": 75.00,
        "totalSeats": 12,
        "availableSeats": 8,
        "status": "available",
        "images": ["https://example.com/image1.jpg"],
        "location": "Great Barrier Reef",
        "duration": 180,
        "difficulty": "beginner"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

#### Get Activity Details
```http
GET /activities/{id}
```

#### Create Activity (Admin only)
```http
POST /activities
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "name": "Night Diving Adventure",
  "description": "Experience underwater life at night",
  "date": "2026-01-20T19:00:00.000Z",
  "price": 95.00,
  "totalSeats": 8,
  "location": "Sunset Point",
  "duration": 120,
  "difficulty": "intermediate",
  "images": ["https://example.com/night-dive.jpg"]
}
```

### Vehicles

#### Get All Vehicles
```http
GET /vehicles?city=Miami&type=SUV&available_from=2026-01-10&available_to=2026-01-15
```

#### Get Vehicle Details
```http
GET /vehicles/{id}
```

### Resorts

#### Get All Resorts
```http
GET /resorts?location=Maldives&check_in=2026-01-10&check_out=2026-01-15&rooms=2
```

#### Get Resort Details
```http
GET /resorts/{id}
```

### Courses

#### Get All Courses
```http
GET /courses?agency=PADI&level=beginner&available=true
```

#### Get Course Details
```http
GET /courses/{id}
```

---

## 📅 Booking Operations

### Create Activity Booking
```http
POST /bookings/activities
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "activityId": "64a7f8b9c123456789abcdef",
  "seatsBooked": 2,
  "activityDate": "2026-01-15T09:00:00.000Z",
  "specialRequests": "Vegetarian lunch preference"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Activity booking created successfully",
  "data": {
    "booking": {
      "id": "64a7f8b9c123456789abcdf0",
      "userId": "64a7f8b9c123456789abcdef",
      "activityId": "64a7f8b9c123456789abcdef",
      "seatsBooked": 2,
      "bookingDate": "2026-01-05T10:30:00.000Z",
      "activityDate": "2026-01-15T09:00:00.000Z",
      "bookingStatus": "pending",
      "totalAmount": 150.00,
      "specialRequests": "Vegetarian lunch preference"
    }
  }
}
```

### Create Vehicle Booking
```http
POST /bookings/vehicles
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "vehicleId": "64a7f8b9c123456789abcdef",
  "pickupDate": "2026-01-10T08:00:00.000Z",
  "dropDate": "2026-01-15T18:00:00.000Z",
  "seatsBooked": 4,
  "pickupLocation": "Miami Airport",
  "dropLocation": "Downtown Miami"
}
```

### Create Resort Booking
```http
POST /bookings/resorts
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "resortId": "64a7f8b9c123456789abcdef",
  "checkInDate": "2026-01-10T15:00:00.000Z",
  "checkOutDate": "2026-01-15T11:00:00.000Z",
  "roomsBooked": 2,
  "guestsCount": 4,
  "specialRequests": "Ocean view room preferred"
}
```

### Create Course Booking
```http
POST /bookings/courses
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "courseId": "64a7f8b9c123456789abcdef",
  "startDate": "2026-02-01T09:00:00.000Z",
  "certificationLevel": "Open Water Diver",
  "medicalClearance": true
}
```

### Get User Bookings
```http
GET /bookings?type=activity&status=confirmed&page=1&limit=10
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `type` (string) - Filter by booking type: activity, vehicle, resort, course
- `status` (string) - Filter by status: pending, confirmed, cancelled, completed
- `page` (number) - Page number
- `limit` (number) - Items per page

### Get Booking Details
```http
GET /bookings/{type}/{id}
Authorization: Bearer {accessToken}
```

### Update Booking
```http
PUT /bookings/{type}/{id}
Authorization: Bearer {accessToken}
```

### Cancel Booking
```http
DELETE /bookings/{type}/{id}
Authorization: Bearer {accessToken}
```

---

## 💳 Payment Processing

### Process Payment
```http
POST /payments
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "bookingId": "64a7f8b9c123456789abcdf0",
  "bookingType": "activity",
  "amount": 150.00,
  "currency": "USD",
  "method": "stripe",
  "paymentMethodId": "pm_1234567890abcdef"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment processed successfully",
  "data": {
    "payment": {
      "id": "64a7f8b9c123456789abcdf1",
      "bookingId": "64a7f8b9c123456789abcdf0",
      "amount": 150.00,
      "currency": "USD",
      "method": "stripe",
      "status": "completed",
      "transactionRef": "pi_1234567890abcdef",
      "createdAt": "2026-01-05T10:35:00.000Z",
      "completedAt": "2026-01-05T10:35:30.000Z"
    },
    "invoice": {
      "id": "64a7f8b9c123456789abcdf2",
      "invoiceNumber": "INV-2026-00001",
      "downloadUrl": "/invoices/64a7f8b9c123456789abcdf2/download"
    }
  }
}
```

### Get Payment Status
```http
GET /payments/{id}
Authorization: Bearer {accessToken}
```

### Process Refund (Admin only)
```http
POST /payments/{id}/refund
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "amount": 75.00,
  "reason": "Customer requested cancellation due to weather"
}
```

### Download Invoice
```http
GET /invoices/{id}/download
Authorization: Bearer {accessToken}
```

---

## 📧 Communication

### Submit Contact Form
```http
POST /contacts
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "subject": "Booking Inquiry",
  "message": "I would like to know more about your diving courses for beginners."
}
```

### Get Contact Messages (Admin only)
```http
GET /contacts?status=new&page=1&limit=10
Authorization: Bearer {accessToken}
```

### Update Contact Status (Admin only)
```http
PATCH /contacts/{id}
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "status": "replied",
  "assignedTo": "64a7f8b9c123456789abcdef"
}
```

---

## ⚙️ Admin Operations

### Dashboard Statistics
```http
GET /admin/dashboard
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalBookings": 150,
      "totalRevenue": 25000.00,
      "pendingBookings": 5,
      "newContacts": 3
    },
    "recentBookings": [...],
    "revenueChart": {...}
  }
}
```

### Get All Users (Admin only)
```http
GET /admin/users?role=customer&page=1&limit=20
Authorization: Bearer {accessToken}
```

### Get All Bookings (Admin only)
```http
GET /admin/bookings?status=pending&date_from=2026-01-01
Authorization: Bearer {accessToken}
```

### Financial Reports
```http
GET /admin/reports/financial?from=2026-01-01&to=2026-01-31&type=monthly
Authorization: Bearer {accessToken}
```

---

## 📊 Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  },
  "timestamp": "2026-01-05T10:30:00.000Z",
  "path": "/api/v1/auth/register"
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource conflict (e.g., duplicate email)
- `PAYMENT_FAILED` - Payment processing error
- `BOOKING_UNAVAILABLE` - Resource not available for booking
- `RATE_LIMIT_EXCEEDED` - Too many requests

---

## 🔍 Response Examples

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Resource data
  },
  "timestamp": "2026-01-05T10:30:00.000Z"
}
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### Validation Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "seatsBooked",
        "message": "Must be between 1 and available seats",
        "value": 15,
        "constraint": "max:8"
      }
    ]
  }
}
```

---

## 📝 Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per IP
- **Payment Processing**: 10 requests per hour per user
- **File Uploads**: 20 requests per hour per user

## 🔧 Request Headers

### Required Headers
```http
Content-Type: application/json
Authorization: Bearer {accessToken}  // For protected routes
```

### Optional Headers
```http
X-Request-ID: unique-request-identifier  // For tracking
Accept-Language: en-US  // For internationalization
```

## 🌍 Internationalization

API supports multiple languages through the `Accept-Language` header:
- `en-US` - English (default)
- `es-ES` - Spanish
- `fr-FR` - French

Error messages and user-facing content will be returned in the requested language.

---

**API Version:** v1  
**Last Updated:** January 5, 2026  
**Maintained By:** DIVER NEST Backend Team

For questions or support, contact: api-support@divernest.com