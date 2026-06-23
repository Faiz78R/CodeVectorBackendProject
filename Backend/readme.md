# Product Browser API

## Overview

This project is a scalable backend service built using the MERN stack (MongoDB, Express.js, React, Node.js) for browsing a large product catalog.

The system is designed to handle **200,000+ products** while providing:

* Product Search
* Category Filtering
* Cursor-Based Pagination
* Snapshot Consistency
* Optimized Database Queries using MongoDB Indexes

The primary goal is to ensure users can browse products efficiently without seeing duplicate or missing records, even when new products are being added to the database.

---
## Design Decisions

### Why Cursor Pagination Instead of Offset Pagination?

A common pagination approach is offset-based pagination using page numbers:

GET /api/products?page=10&limit=20

However, offset pagination becomes less efficient as the dataset grows because the database must skip a large number of records before returning results.

Since this project is designed to handle 200,000+ products, cursor-based pagination was chosen.

Example:

GET /api/products?cursor=687abc123

Benefits:

* Better performance on large datasets
* More scalable than offset pagination
* Reduces database workload
* Provides a smoother experience when browsing large product catalogs

---

### Why Snapshot Pagination?

One of the requirements was ensuring users do not see duplicate products or miss products while browsing, even when new products are addedp.

Consider the following scenario:

User loads Page 1:

100
99
98
97
96

While the user is browsing, new products are inserted:

110
109
108

Without snapshot pagination, the next page request could return duplicate products or skip some products entirely because the dataset has changed.

To solve this problem, a snapshot timestamp is created when the user starts browsing.

Example:

2026-06-23T10:00:00Z

All subsequent requests only fetch products that existed before that timestamp.

Benefits:

* Consistent browsing experience
* No duplicate records
* No missing records
* Stable pagination even when new products are added

---

### Why MongoDB Indexes?

The application frequently performs:

* Product retrieval
* Category filtering
* Sorting by creation date

Without indexes, MongoDB would need to scan a large number of documents to find matching records.

Indexes were added on:

* createdAt
* category
* category + createdAt

Benefits:

* Faster query execution
* Better scalability
* Improved API response times

---

### Why Bulk Inserts During Seeding?

Generating 200,000 products one document at a time would create 200,000 database operations.

Instead, products are inserted in batches using insertMany().

Benefits:

* Faster data generation
* Reduced database overhead
* More efficient use of resources

This approach allows the dataset to be generated quickly while maintaining good performance.


## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Development Tools

* Postman
* MongoDB Atlas
* Nodemon

---

## Project Structure

backend/
│
├── config/
│ └── db.js
│
├── controllers/
│ └── productController.js
│
├── models/
│ └── Product.js
│
├── routes/
│ └── productRoutes.js
│
├── .env
├── server.js
└── package.json

---

## Features

### 1. Product Search

Search products by name.

Example:

GET /api/products?search=laptop

---

### 2. Category Filter

Filter products by category.

Example:

GET /api/products?category=Electronics

---

### 3. Cursor Pagination

Instead of traditional offset pagination, this project uses cursor-based pagination.

Benefits:

* Faster for large datasets
* Better scalability
* Prevents pagination inconsistencies

Example:

GET /api/products?cursor=687abc123

---

### 4. Snapshot Pagination

A snapshot timestamp is generated when the user starts browsing.

All subsequent requests use the same snapshot.

Benefits:

* No duplicate products
* No missing products
* Consistent browsing experience

Example:

GET /api/products?cursor=687abc123&snapshot=2026-06-23T10:00:00Z

---

### 5. Database Indexing

Indexes were added to optimize query performance.

Indexes:

* createdAt
* category
* category + createdAt

Reason:

Without indexes, MongoDB scans every document.

With indexes, MongoDB directly locates matching records.

---

## API Endpoints

### Seed Products

POST /api/products/seed

Purpose:

Generates and inserts products into MongoDB.

---

### Get Products

GET /api/products

Returns paginated product data.

---

### Search Products

GET /api/products?search=Product

---

### Filter Products

GET /api/products?category=Electronics

---

### Search + Filter

GET /api/products?search=Product&category=Electronics

---

### Pagination

GET /api/products?limit=20

---

### Cursor Pagination

GET /api/products?cursor=<nextCursor>

---

### Snapshot Pagination

GET /api/products?cursor=<nextCursor>&snapshot=<snapshot>

---

## How Snapshot Pagination Works

Problem:

A user opens page 1.

Products displayed:

100
99
98
97
96

While browsing, new products are inserted:

110
109
108

Traditional pagination can cause:

* Duplicate records
* Missing records

Solution:

A snapshot timestamp is generated when browsing starts.

All subsequent requests only return products created before that snapshot.

Result:

* Consistent browsing
* No duplicates
* No missing products

---

## Performance Considerations

### Bulk Inserts

Products are inserted using insertMany() in batches.

Benefits:

* Fewer database operations
* Faster seeding
* Reduced memory overhead

### Indexing

Indexes significantly reduce query execution time for:

* Search
* Filtering
* Sorting

### Cursor Pagination

Cursor pagination scales much better than offset pagination for large datasets.

---

## Running the Project

### Install Dependencies

npm init -y
npm install express mongoose dotenv

### Configure Environment Variables

Create a .env file:

PORT=

MONGO_URI=your_mongodb_connection_string

### Start Server

nodemon ./index.js

Expected Output:

MongoDB Connected

Server Running On Port 5000

---

## Testing with Postman

### Seed Products

POST

/api/products/seed

### Get Products

GET

/api/products

### Search Products

GET

/api/products?search=Product

### Filter Products

GET

/api/products?category=Electronics

### Pagination

GET

/api/products?limit=20

---

## Challenges Faced

The most challenging aspect of this project was maintaining pagination consistency while new products were being added to the database.

To solve this, snapshot-based pagination was implemented alongside cursor pagination to ensure users always receive a stable view of the product catalog.

---

## What I Learned

Through this project I learned:

* MongoDB indexing strategies
* Cursor-based pagination
* Snapshot consistency techniques
* API performance optimization
* Handling large datasets efficiently
* Designing scalable backend services

---

## Future Improvements

* React Frontend
* Infinite Scrolling
* Product Sorting
* Redis Caching
* Authentication & Authorization
* Advanced Search Filters
* API Rate Limiting

---

## Author

Faiz Ahmad

Backend Developer | MERN Stack Developer | GATE Qualified

This project was built as part of a backend engineering assignment focused on scalability, consistency, and performance.
