# 📘 SDLC Documentation for YellowPages-like Web Application

---

## 📌 Core Features

- Business listings by category/location
- Search & filtering
- User reviews & ratings
- Business owner registration & management
- Maps/location integration
- Ads & promotions
- SEO-friendly pages

---

## 📋 Requirement Gathering & Analysis

### 🎯 Objective:

Understand the core goals, audience, and feature scope of the platform.

### 👥 Stakeholders:

- **Business Owners** – Listing providers
- **End Users** – Searching for businesses
- **Admins** – Manage listings, users, and content

### ✅ Functional Requirements:

- Business listings (Add/View/Edit/Delete)
- Categories and locations
- Search & filter functionality
- User registration/login
- Business owner dashboard
- Ratings and reviews
- Ads/promoted listings
- Contact forms & Google Maps integration
- Admin panel

### ⚙️ Non-Functional Requirements:

- SEO optimization
- Scalability
- Mobile responsiveness
- Security (XSS, SQLi, CSRF prevention)
- Performance optimization

---

## 🛠 Planning

### 🧱 Tech Stack:

- **Frontend:** React, Next.js
- **Backend:** Node.js + Express
- **Database:** MongoDB / PostgreSQL
- **Search:** MongoDB Text Search / Elasticsearch
- **Authentication:** JWT + Role-based Access
- **Hosting:** AWS / Vercel / Render
- **APIs:** Google Maps API, Email/Mailer API

---

## 🏗 Designing Architecture

### 🗺 High-Level Design (HLD)

- System architecture (Monolith or Microservices)
- Third-party APIs (Maps, email)
- Database design & relationships
- CI/CD pipeline overview

### 🔧 Low-Level Design (LLD)

- **Database Schemas**:
  - User
  - Business
  - Category
  - Review
  - Admin
  - Subscription
- **API Design**: RESTful or GraphQL, organized by role (public/admin)
- **Component Design**
- **Role-Based Access Control (RBAC)**

---

## 🚧 Development Plan

### 🔁 Agile Sprint Breakdown

| Sprint   | Focus                                                    |
| -------- | -------------------------------------------------------- |
| Sprint 1 | Auth system (register, login, forgot, roles)             |
| Sprint 2 | Business listing module (CRUD)                           |
| Sprint 3 | Categories, tags, location-based filtering               |
| Sprint 4 | Review & ratings, user dashboards                        |
| Sprint 5 | Admin panel (moderation, approval)                       |
| Sprint 6 | Search optimization, SEO-friendly slugs                  |
| Sprint 7 | Payment integration (for featured listings)              |
| Sprint 8 | Final polishing, responsive UI, dark mode, accessibility |

---

## 🧪 Product Testing & Integration

- **Unit Testing**: Jest, Mocha
- **Integration Testing**: API + DB
- **UI Testing**: Cypress, Playwright
- **Load Testing**: k6, JMeter
- **SEO Validation**
- **Security Testing**: Helmet, input validation

---

## 🚀 Deployment & Maintenance

- **Frontend Deployment**: Vercel
- **Backend Deployment**: Render or AWS with Docker

### 🌐 User Flow Diagram:

```
User → Search/Filter Listings → View Business Profile → Contact / Review / Bookmark
Business Owner → Register/Login → Add Listing → Track Views → Upgrade to Premium
Admin → Approve Listings → Monitor Reviews → Manage Users & Ads
```

---

## 🏛 High-Level Architecture (HLD)

```
+------------------------+
|   Client (Browser)     |
| React / Next.js App    |
+----------+-------------+
           |
   HTTPS / REST API
           |
+----------v-------------+
|   Backend (Node.js)    |
|  Express REST API      |
+----------+-------------+
           |
+----------+-------------+------------+
|         |             |            |
|    +----v----+   +----v----+   +----v-------+
|    MongoDB   |   Redis(opt)|   Elasticsearch |
|    Database  |   Caching   |   Search Index  |
+-------------+-------------+------------------+
```

### 📦 External APIs

```
+--------------------+   +----------------+   +------------------+
| Google Maps API    |   | Email Service  |   | Payment Gateway  |
| (Location Mapping) |   | (SendGrid)     |   | (Stripe/Razorpay)|
+--------------------+   +----------------+   +------------------+
```

---

## ⚙️ Low-Level Design (LLD)

### Auth Controller (JWT)

- `POST /register`
- `POST /login`
- `POST /forgot-password`

### Business Controller

- `POST /add-listing`
- `PUT /edit-listing/:id`
- `DELETE /delete-listing/:id`
- `GET /listings`
- `GET /listings/search`

### Review Controller

- `POST /submit-review`
- `GET /reviews/:businessId`

### Admin Controller

- `GET /pending-listings`
- `POST /approve-listing/:id`
- `GET /users`
- `DELETE /user/:id`
- `GET /ads`

---

## 🗃 Database Design (ERD)

### [User]

- `_id`
- `name`
- `email`
- `password`
- `role` (user/business/admin)

### [Review]

- `_id`
- `rating`
- `comment`
- `user_id` (FK)
- `business_id` (FK)

### [Business]

- `_id`
- `name`
- `category`
- `location`
- `description`
- `owner_id` (FK)

### [Category]

- `_id`
- `name`

---

## 📦 Deployment Architecture Diagram

```
+--------------------------+
|   Developer (Git Push)   |
+------------+-------------+
             |
             v
+--------------------------+
| GitHub Actions (CI/CD)   |
+------------+-------------+
             |
     +-------+--------+
     | Frontend Build |
     |  (Vercel)      |
     +----------------+
     | Backend Deploy |
     | (Docker + AWS) |
     +----------------+
             |
             v
   +---------------------+
   | Production Servers  |
   +---------------------+
```

> 📚 This SDLC document provides a clear roadmap for developers, stakeholders, and testers to build and maintain a business directory web app like YellowPages.

<!-- JIRA BASED PROJECT COMPLETION -->

# Agile-based JIRA Breakdown for YellowPage.com Clone

---

### 📊 Project Overview:

A web application for YellowPages-style business directory with features like business listings, reviews, search/filter, ads, and maps.

---

## 📃 EPICS

1. **User Management**
2. **Business Listings**
3. **Search & Filter**
4. **Reviews & Ratings**
5. **Business Owner Panel**
6. **Admin Panel**
7. **SEO & Marketing**
8. **Ads & Promotions**
9. **Maps & Location Services**
10. **Authentication & Authorization**

---

## 📝 USER STORIES & TASKS (Grouped by EPIC)

### 1. ⬛ User Management

- **US001**: As a user, I want to register and login securely.

  - Design signup/login UI
  - Create user schema (MongoDB)
  - Setup JWT auth & password hashing
  - Create login & register API
  - Add toast feedback for success/failure

- **US002**: As a user, I want to manage my profile.
  - Profile page layout
  - Profile update API
  - Upload avatar
  - Test for invalid inputs

---

### 2. 📅 Business Listings

- **US003**: As a user, I want to view listings by category/location.

  - Create category schema & data
  - API to get listings by category/location
  - UI for category cards & listing page

- **US004**: As a business owner, I want to add a new listing.

  - Form with business details, images
  - POST /api/listings with validation
  - Handle pending approval status

- **US005**: As an admin, I want to approve/reject listings.
  - Admin dashboard table of new submissions
  - Approve/reject button + API
  - Update status in DB

---

### 3. 🔍 Search & Filter

- **US006**: As a user, I want to search for businesses.

  - Search bar with live suggestions
  - Backend full-text search API
  - Result listing UI

- **US007**: As a user, I want to apply filters.
  - Filter UI (open now, ratings, price)
  - API query params integration

---

### 4. ⭐ Reviews & Ratings

- **US008**: As a user, I want to rate and review businesses.

  - Review schema
  - Submit review API
  - Rating component UI

- **US009**: As a user, I want to see total ratings and reviews.
  - GET reviews API
  - Aggregate rating logic

---

### 5. 💼 Business Owner Panel

- **US010**: As a business owner, I want to manage my listings.
  - My listings dashboard
  - Edit listing form
  - Track analytics (views/clicks)

---

### 6. 🔧 Admin Panel

- **US011**: As an admin, I want to manage users and listings.

  - User table with block/unblock options
  - Listings table with edit/delete

- **US012**: As an admin, I want to see platform analytics.
  - Total users, listings, reviews
  - Graphs for growth over time

---

### 7. 📈 SEO & Marketing

- **US013**: As an SEO manager, I want all pages to be SEO-optimized.
  - Add meta tags dynamically
  - Schema.org for listings
  - XML sitemap + robots.txt

---

### 8. 🏠 Ads & Promotions

- **US014**: As a business owner, I want to promote my listing.
  - Promote button + payment modal
  - Payment gateway integration (Razorpay/Stripe)
  - Highlight promoted listings

---

### 9. 🌐 Maps & Location Services

- **US015**: As a user, I want to view business location on map.
  - Google Maps API integration
  - Geolocation fetch for nearby results

---

### 10. 🔐 Authentication & Authorization

- **US016**: As an app, I want to protect routes based on roles.
  - Middleware for role-based auth
  - Admin vs User vs Business routes

---

## 📋 SAMPLE SPRINT PLAN

### ⏱ Sprint 1 – Core Setup (1 week)

- User Auth (US001)
- DB & Server setup
- Basic homepage layout

### ⏱ Sprint 2 – Listings Module (2 weeks)

- US003, US004, US005 (Listing APIs, approval flow)

### ⏱ Sprint 3 – Search & Reviews (2 weeks)

- US006, US007, US008, US009

### ⏱ Sprint 4 – Admin & SEO (2 weeks)

- US011, US012, US013

### ⏱ Sprint 5 – Maps, Ads & Final Polish (1–2 weeks)

- US014, US015, US016
- Bug fixes, responsiveness, deployment

---

## 🔹 Agile Board Columns

- Backlog
- To Do
- In Progress
- Code Review
- Testing
- Done

---
