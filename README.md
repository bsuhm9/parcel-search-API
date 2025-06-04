# parcel-search-API

Project Proposal: parcel-search-API

This project is attempting to create a property search API aligned with the real estate industry or for curious home owners.
Currently, my local county assessor property search website is a bit lacking, and only allows users to search on the unique numeric parcel number, or address.
This API seeks to extend that search capability to include more parcel attributes and allow for a greater flexibility in searching and finding properties.

I'll attempt to include some core features in the design:

- Authentication and Authorization
  A user login and an administrator login with associated authorization to different functionality
- CRUD Operations (some reserved for authorized Admin users)
- Routes will include:
  1. an auth/signup, auth/login,
  2. /parcels (POST, GET) and /parcels/:id (GET, PUT, DELETE)
  3. /saved-searches (POST GET) and /saved-searches/:id (GET, DELETE)
- Query parameters may include attributes such as minPrice, maxPrice, bedrooms, bathrooms, condition, yearBuiltFrom, yearBuiltTo, etc.
- Data models will include a user & parcel
- Data source will be a MongoDB with locally sourced parcel data imported
- Indices will be generated to aid performance and search functions (price, bedrooms, etc.)
- Test cases will be compiled for auth routes (signup, login), parcel searches/filtering, and authorization
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
  Implement the GET /parcels with query parameter filtering
  Create GET /parcles/:id
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

Project Update and Proof of Concept (5/21/25)

- Project scaffolding is complete, folder structure includes (controllers, daos, middleware, models, routes, seed, tests, and utils along wiht the app.js and server.js)
- Express and MongoDB connections created
- User and Property models outlined
- Dao layer in place
- Basic seed data records
- Controllers created which leverage the doas
- auth and properties routes defined
- Express App configured

Work Still To Come

- Much of week 2 listed above
- Weeks 3 through 5
- 

PROJECT EVALUATION
What Worked Well
DAO and Route Structure: Separating things by using a DAO-based file structure made the project more maintainable and testable. It helped keep the logic clean and modular.

Authentication & Authorization: Implementing authenticate and authorizeAdmin middleware using JWTs was effective. It allowed me to clearly separate access between regular users and admins, and enforce security around sensitive routes (like batch parcel processing).

Testing with Jest & Supertest: Writing comprehensive route tests using Supertest helped validate expected behavior and catch regressions. Mocking functions like batchFetchAndStore gave control over how dependencies behaved during testing.

Express Routing: Routing stayed organized. Using route modules for parcels, Yakima batch fetch, and user auth helped me to build incrementally.


What Could Be Improved
Error Handling: While error messages are included in my code, the logs during tests (e.g., from console.error) can clutter output and could be better managed or mocked during test runs.

Test Readability: Some tests had side effects or setup code (e.g., JWT generation) that could be separated into reusable sections to minimize code duplication.

Front End: A simple front end would allow a more usable product.


What I Learned
How to build secure Express routes using middleware for authentication and authorization.

How to structure code using DAOs and controllers to support separation of concerns and cleaner code reuse.

How to handle complex testing scenarios involving role-based access control with web tokens.


What I’d Do Differently
I would try to make the basic routes first in order to stay more organized.  I did get side tracked building the data and gathering it from the county assessor's site in the beginning.


