1. ER Diagram Overview
Entities: User, Activity, Vehicle, Resort, Course, Booking, Payment, Invoice, Refund, Contact
Relationships: Users make Bookings → Bookings include Activities/Vehicles/Resorts/Courses → Bookings generate Payments → Payments create Invoices → Refunds reverse Payments.

2. Database Schema (MongoDB)
User: _id, email, name, role, createdAt
Booking: _id, userId, items[], total, status, dates
Activity/Vehicle/Resort/Course: _id, name, price, capacity, availability
Payment: _id, bookingId, amount, method, status
Invoice: _id, paymentId, details, issuedDate
Refund: _id, paymentId, amount, reason

3. System Architecture
Frontend: React/Vue.js UI for customers/admin
Backend: Node.js/Express API layer
Database: MongoDB for flexible document storage
Integration: REST APIs connect all components
Design Goals: Scalability through microservices, maintainability via clear separation

4. User Flows
Customer: Browse → Select items → Book → Pay → Receive confirmation
Admin: Manage resources → View bookings → Process refunds → Generate reports
Auth Flow: Register/Login → JWT token → Protected routes

5. Booking Workflow
User selects resources (activities/vehicles/etc.)

System checks availability for selected dates

User confirms booking → creates pending Booking document

User completes payment → Booking status: confirmed

System updates resource availability

Email confirmation sent

6. Payment & Financial Workflow
Group Checkout: Multiple items in single transaction
Payment Flow: Stripe/PayPal integration → success/failure webhooks
Invoice: Auto-generated after payment, includes all booking details
Refund: Admin-initiated → reverses payment → updates booking status
Statuses: pending → paid/refunded/failed
