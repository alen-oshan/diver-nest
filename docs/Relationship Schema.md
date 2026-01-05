# 🗃️ DIVER NEST - Database Relationship Schema

> Detailed database schema design with entity relationships, constraints, and data types for the Diving Centre Booking System.

## 📋 Table of Contents

- [📊 Schema Overview](#-schema-overview)
- [👤 User Management](#-user-management)
- [🎯 Service Entities](#-service-entities)
- [📅 Booking Entities](#-booking-entities)
- [💳 Financial Entities](#-financial-entities)
- [📞 Communication](#-communication)
- [🔗 Relationship Constraints](#-relationship-constraints)
- [📈 Indexing Strategy](#-indexing-strategy)

---

## 📊 Schema Overview

The database schema is designed for MongoDB, utilizing flexible document structure while maintaining referential relationships through ObjectIds.

### Core Entity Types
- **User Management**: Users
- **Services**: Activities, Vehicles, Resorts, Courses
- **Bookings**: Activity/Vehicle/Resort/Course Bookings (Junction entities)
- **Financial**: Payments, Invoices, Refunds
- **Communication**: Contacts

---

## 👤 User Management

### Users Collection

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `user_id` | ObjectId | **PRIMARY KEY** | Unique user identifier |
| `name` | String | Required, 2-100 chars | Full name |
| `email` | String | **UNIQUE**, Required | Email address |
| `phone` | String | Optional, 10-15 chars | Contact number |
| `role` | Enum | **ENUM**('admin', 'staff', 'customer') | User role |
| `password_hash` | String | Required | Encrypted password |
| `created_at` | DateTime | Auto-generated | Account creation time |
| `updated_at` | DateTime | Auto-updated | Last modification time |

**Indexes:**
- `email` (unique)
- `role`
- `created_at`

---

## 🎯 Service Entities

### Activities Collection

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `activity_id` | ObjectId | **PRIMARY KEY** | Unique activity identifier |
| `name` | String | Required, 3-100 chars | Activity name |
| `description` | Text | Optional, max 1000 chars | Detailed description |
| `price` | Decimal(10,2) | Required, >= 0 | Price per person |
| `total_seats` | Integer | Required, > 0 | Maximum capacity |
| `status` | Enum | **ENUM**('available', 'full', 'cancelled') | Current status |
| `images` | Array[String] | Optional | Image URLs |
| `duration` | Integer | Optional | Duration in minutes |

**Constraints:**
- `price` ≥ 0
- `total_seats` > 0

### Vehicles Collection

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `vehicle_id` | ObjectId | **PRIMARY KEY** | Unique vehicle identifier |
| `vehicle_number` | String | **UNIQUE**, Required | License plate number |
| `brand` | String | Required | Vehicle manufacturer |
| `model` | String | Optional | Vehicle model |
| `seat_capacity` | Integer | Required, > 0 | Maximum passengers |
| `type` | String | Required | Vehicle category |
| `city` | String | Required | Base location |
| `price_per_day` | Decimal(10,2) | Required, >= 0 | Daily rental rate |
| `status` | Enum | **ENUM**('available', 'booked', 'maintenance') | Current status |
| `features` | Array[String] | Optional | Vehicle features |
| `images` | Array[String] | Optional | Vehicle images |

**Constraints:**
- `vehicle_number` must be unique
- `seat_capacity` > 0
- `price_per_day` ≥ 0

### Resorts Collection

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `resort_id` | ObjectId | **PRIMARY KEY** | Unique resort identifier |
| `name` | String | Required, 3-100 chars | Resort name |
| `location` | String | Required | Resort location |
| `price_per_night` | Decimal(10,2) | Required, >= 0 | Nightly rate |
| `total_rooms` | Integer | Required, > 0 | Total room count |
| `available_rooms` | Integer | Computed | Current availability |
| `status` | Enum | **ENUM**('available', 'fully_booked') | Current status |
| `images` | Array[String] | Optional | Resort images |
| `amenities` | Array[String] | Optional | Available amenities |
| `room_types` | Array[Object] | Optional | Room configurations |

**Constraints:**
- `available_rooms` ≤ `total_rooms`
- `total_rooms` > 0
- `price_per_night` ≥ 0

### Courses Collection

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `course_id` | ObjectId | **PRIMARY KEY** | Unique course identifier |
| `name` | String | Required, 3-100 chars | Course name |
| `level` | Enum | **ENUM**('beginner', 'intermediate', 'advanced') | Course difficulty |
| `duration_days` | Integer | Required, > 0 | Course duration |
| `price` | Decimal(10,2) | Required, >= 0 | Course fee |
| `max_students` | Integer | Required, > 0 | Maximum enrollment |
| `current_enrollment` | Integer | Computed | Current students |
| `status` | Enum | **ENUM**('available', 'full', 'completed', 'cancelled') | Course status |
| `start_date` | DateTime | Required | Course start date |
| `end_date` | DateTime | Computed | Course end date |
| `instructor` | String | Optional | Instructor name |
| `certification` | String | Optional | Certification awarded |

**Constraints:**
- `duration_days` > 0
- `max_students` > 0
- `current_enrollment` ≤ `max_students`
- `end_date` > `start_date`
- `price` ≥ 0

---

## 📅 Booking Entities

### ActivityBookings Collection (Junction Table)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `booking_id` | ObjectId | **PRIMARY KEY** | Unique booking identifier |
| `user_id` | ObjectId | **FOREIGN KEY** → Users | Customer reference |
| `activity_id` | ObjectId | **FOREIGN KEY** → Activities | Activity reference |
| `seats_booked` | Integer | Required, > 0 | Number of seats |
| `booking_date` | DateTime | Auto-generated | Booking creation time |
| `activity_date` | DateTime | Required | Scheduled activity date |
| `booking_status` | Enum | **ENUM**('pending', 'confirmed', 'cancelled', 'completed') | Booking state |
| `total_amount` | Decimal(10,2) | Computed | Total cost |
| `special_requests` | Text | Optional | Customer notes |

**Constraints:**
- `seats_booked` ≤ Activities.available_seats
- `seats_booked` > 0
- `activity_date` ≥ current_date

### VehicleBookings Collection (Junction Table)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `booking_id` | ObjectId | **PRIMARY KEY** | Unique booking identifier |
| `user_id` | ObjectId | **FOREIGN KEY** → Users | Customer reference |
| `vehicle_id` | ObjectId | **FOREIGN KEY** → Vehicles | Vehicle reference |
| `pickup_date` | DateTime | Required | Rental start date |
| `drop_date` | DateTime | Required | Rental end date |
| `seats_booked` | Integer | Required, > 0 | Number of passengers |
| `booking_status` | Enum | **ENUM**('pending', 'confirmed', 'cancelled', 'completed') | Booking state |
| `total_amount` | Decimal(10,2) | Computed | Total rental cost |
| `pickup_location` | String | Optional | Pickup address |
| `drop_location` | String | Optional | Drop-off address |

**Constraints:**
- `seats_booked` ≤ Vehicles.seat_capacity
- `drop_date` > `pickup_date`
- `pickup_date` ≥ current_date
- `seats_booked` > 0

### ResortBookings Collection (Junction Table)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `booking_id` | ObjectId | **PRIMARY KEY** | Unique booking identifier |
| `user_id` | ObjectId | **FOREIGN KEY** → Users | Customer reference |
| `resort_id` | ObjectId | **FOREIGN KEY** → Resorts | Resort reference |
| `check_in_date` | DateTime | Required | Check-in date |
| `check_out_date` | DateTime | Required | Check-out date |
| `rooms_booked` | Integer | Required, > 0 | Number of rooms |
| `guests_count` | Integer | Required, > 0 | Total guests |
| `booking_status` | Enum | **ENUM**('pending', 'confirmed', 'cancelled', 'completed') | Booking state |
| `total_amount` | Decimal(10,2) | Computed | Total accommodation cost |
| `special_requests` | Text | Optional | Special requirements |

**Constraints:**
- `rooms_booked` ≤ Resorts.available_rooms
- `check_out_date` > `check_in_date`
- `check_in_date` ≥ current_date
- `rooms_booked` > 0
- `guests_count` > 0

### CourseBookings Collection (Junction Table)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `booking_id` | ObjectId | **PRIMARY KEY** | Unique booking identifier |
| `user_id` | ObjectId | **FOREIGN KEY** → Users | Student reference |
| `course_id` | ObjectId | **FOREIGN KEY** → Courses | Course reference |
| `enrollment_date` | DateTime | Auto-generated | Registration date |
| `start_date` | DateTime | Required | Course start date |
| `booking_status` | Enum | **ENUM**('pending', 'confirmed', 'cancelled', 'completed') | Enrollment state |
| `total_amount` | Decimal(10,2) | From Courses.price | Course fee |
| `certification_level` | String | Optional | Target certification |
| `medical_clearance` | Boolean | Required | Medical fitness |

**Constraints:**
- Course enrollment ≤ Courses.max_students
- `start_date` = Courses.start_date
- `medical_clearance` = true

---

## 💳 Financial Entities

### Payments Collection

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `payment_id` | ObjectId | **PRIMARY KEY** | Unique payment identifier |
| `booking_id` | ObjectId | **FOREIGN KEY** | References specific booking |
| `booking_type` | Enum | **ENUM**('activity', 'vehicle', 'resort', 'course') | Booking category |
| `user_id` | ObjectId | **FOREIGN KEY** → Users | Payer reference |
| `total_amount` | Decimal(10,2) | Required, > 0 | Payment amount |
| `currency` | String | Default 'USD' | Currency code |
| `method` | Enum | **ENUM**('stripe', 'paypal', 'bank_transfer') | Payment method |
| `status` | Enum | **ENUM**('pending', 'completed', 'failed', 'refunded') | Payment state |
| `transaction_ref` | String | **UNIQUE** | Gateway transaction ID |
| `gateway_response` | Object | Optional | Gateway response data |
| `created_at` | DateTime | Auto-generated | Payment initiation time |
| `completed_at` | DateTime | Optional | Payment completion time |

**Constraints:**
- `total_amount` > 0
- `transaction_ref` must be unique
- `completed_at` ≥ `created_at` when status = 'completed'

### Invoices Collection

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `invoice_id` | ObjectId | **PRIMARY KEY** | Unique invoice identifier |
| `payment_id` | ObjectId | **FOREIGN KEY** → Payments | Associated payment |
| `invoice_number` | String | **UNIQUE**, Auto-generated | Human-readable ID |
| `issued_date` | DateTime | Auto-generated | Invoice creation date |
| `due_date` | DateTime | Optional | Payment due date |
| `subtotal` | Decimal(10,2) | Required | Pre-tax amount |
| `tax_amount` | Decimal(10,2) | Computed | Tax portion |
| `total_amount` | Decimal(10,2) | Computed | Final amount |
| `status` | Enum | **ENUM**('issued', 'paid', 'cancelled') | Invoice state |
| `items` | Array[Object] | Required | Invoice line items |

**Business Rules:**
- `total_amount` = `subtotal` + `tax_amount`
- `total_amount` = Payments.total_amount
- Invoice auto-generated after successful payment

### Refunds Collection

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `refund_id` | ObjectId | **PRIMARY KEY** | Unique refund identifier |
| `payment_id` | ObjectId | **FOREIGN KEY** → Payments | Original payment |
| `amount` | Decimal(10,2) | Required, > 0 | Refund amount |
| `reason` | Text | Required | Refund justification |
| `status` | Enum | **ENUM**('requested', 'approved', 'processed', 'rejected') | Refund state |
| `requested_by` | ObjectId | **FOREIGN KEY** → Users | Requester |
| `processed_by` | ObjectId | **FOREIGN KEY** → Users | Admin processor |
| `requested_at` | DateTime | Auto-generated | Request time |
| `processed_at` | DateTime | Optional | Processing time |
| `gateway_refund_id` | String | Optional | Gateway refund reference |

**Constraints:**
- `amount` ≤ Payments.total_amount - SUM(existing refunds for this payment)
- `amount` > 0
- `processed_at` ≥ `requested_at` when status = 'processed'

---

## 📞 Communication

### Contacts Collection

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `contact_id` | ObjectId | **PRIMARY KEY** | Unique contact identifier |
| `name` | String | Required, 2-100 chars | Contact name |
| `email` | String | Required, valid email | Contact email |
| `phone` | String | Optional, 10-15 chars | Contact number |
| `subject` | String | Required, 5-200 chars | Inquiry subject |
| `message` | Text | Required, 10-2000 chars | Inquiry details |
| `status` | Enum | **ENUM**('new', 'read', 'replied', 'closed') | Contact state |
| `priority` | Enum | **ENUM**('low', 'medium', 'high') | Urgency level |
| `assigned_to` | ObjectId | **FOREIGN KEY** → Users | Assigned staff member |
| `created_at` | DateTime | Auto-generated | Inquiry time |
| `updated_at` | DateTime | Auto-updated | Last modification |

**Constraints:**
- Only admin/staff users can be assigned
- Email format validation required

---

## 🔗 Relationship Constraints

### Foreign Key Relationships

```
Users (1) ←→ (N) ActivityBookings ←→ (1) Activities
Users (1) ←→ (N) VehicleBookings ←→ (1) Vehicles  
Users (1) ←→ (N) ResortBookings ←→ (1) Resorts
Users (1) ←→ (N) CourseBookings ←→ (1) Courses

Bookings (1) ←→ (1) Payments ←→ (1) Invoices
Payments (1) ←→ (N) Refunds

Users (1) ←→ (N) Contacts
```

### Referential Integrity Rules

1. **Cascade Delete**: When a User is deleted, all associated bookings are marked as 'cancelled'
2. **Restrict Delete**: Cannot delete Activities/Vehicles/Resorts/Courses with active bookings
3. **Update Availability**: Booking confirmations/cancellations update resource availability
4. **Payment Linking**: Each booking must have exactly one payment record
5. **Invoice Generation**: Successful payments automatically generate invoices

---

## 📈 Indexing Strategy

### Primary Indexes
- All `_id` fields (automatic MongoDB indexes)
- All foreign key fields for efficient joins

---

**Schema Version:** 2.0  
**Last Updated:** January 5, 2026  
**MongoDB Version:** 4.4+  
**Maintained By:** DIVER NEST Database Team