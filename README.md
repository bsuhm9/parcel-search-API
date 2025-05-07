# parcel-search-API

Project Proposal:  parcel-search-API

This project is attempting to create a property search API aligned with the real estate industry or for curious home owners.
Currently, my local county assessor property search website is a bit lacking, and only allows users to search on the unique numeric parcel number, or address.
This API seeks to extend that search capability to include more parcel attributes and allow for a greater flexibility in searching and finding properties.

We'll attempt to include some core features in our design:
 - Authentication and Authorization
   A user login and an administrator login with associated authorization to different functionality
 - CRUD Operations (some reserved for authorized Admin users)
- Routes will include an auth/signup, auth/login, along with /properties
- Query parameters may include attributes such as minPrice, maxPrice, bedrooms, bathrooms, condition, yearBuiltFrom, yearBuiltTo, etc.
 - Data models will include a user & property
 - Data source will be a MongoDB with locally sourced property data imported
 - Indices will be generated to aid performance and search functions (price, bedrooms, etc.)
 - Test cases will be compiled for auth routes (signup, login), property searches/filtering, and authorization
 - A Postman collection will be leveraged to demonstrate the API functionality

Project Timeline Milestones
 - Week 1: 
   Create the project framework (create the Git repo, folder structure, and .env config)
   Set up basic Express App
   Create the MongoDB & collection with Mongoose
   Define the DAOs (user, property)
   Configure the JWT based authentication
   Implement the auth signup and login
   Create tests for the authentication routes
   Input sample data for the property collection

 - Week 2:
   Implement the GET /properties with query parameter filtering
   Create GET /properties/:id
   Build Admin-only routes (post, put, delete)
   Restrict routes with middleware (isAdmin, isAuthenticated)
   Create database indices

 - Week 3:
   Explore aggregation (average price per zip code, count of properties by condition, etc.)
   Create error handling (invalid IDs, missing data, etc.)
   
 - Week 4: 
   Create Postman collection (login, property search, etc.)
   Write remaining test cases to hit >80% coverage
   Complete database seeding with final data
   
 - Week 5:
   Ensure Postman collection is finalized and covers core functionality
   Review & practice 5 minute demo
   Complete Demo for class
