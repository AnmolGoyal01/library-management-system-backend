
# Library Management System


A robust backend for a Library Management System
 built with the MERN stack. This project supports crud operations on user and books of library with special powers to admin

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Books](#books)
  - [Transaction](#transaction)
  - [Health check](#healthcheck)
- [Middleware](#middleware)
- [Error Handling and Api Response](#error-handling-and-api-response)

## Features

- **User Authentication**: Register, login, logout, password management.
- **Admin Features**: Admin can add, update and delete books.
- **Books**: Available books can be listed with pagination support
- **Transactions**: Books can be borrowed or returned based on their availability
## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Token (JWT)
- **Password Hashing**: bcrypt
- **Other Libraries**: mongoose-aggregate-paginate-v2
## Project Structure

```plaintext
src
├── controllers          # API controllers
├── middlewares          # Authentication middlewares
├── models               # Mongoose models for User, Books, etc.
├── routes               # Express routes for each resource
├── utils                # Utilities and helpers
├── config               # Database connection and setup configurations
├── app.js               # Express app setup and configuration
├── constants.js         # Application-wide constants configuration
└── index.js             # Entry point to start the server
```
## Setup & Installation

- Clone the repository:

```bash
  git clone https://github.com/AnmolGoyal01/library-management-system-backend
  cd library-management-system-backend
```
    
- Install dependencies:

```bash
  npm install
```
- Configure environment variables: Create a `.env` file at the root level and add the following variables:

```bash
  PORT=4000
  CORS_ORIGIN =*
  MONGODB_URI=<Your MongoDB URI>
  JWT_SECRET=<Your JWT_SECRET key>
  JWT_EXPIRE=1d
```
    
- Run in Development:

```bash
  npm run dev
```
- Build and start server:

```bash
  npm run build
  npm run start
```

The server should now be running at `http://localhost:4000`
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`CORS_ORIGIN`
`MONGODB_URI`
`JWT_SECRET`
`JWT_EXPIRE`


## API Documentation

#### Authentication
-  Register User: `POST api/v1/user/register`
-  Login User: `POST api/v1/user/login`
-  Logout User: `POST api/v1/user/logout`
-  Get Current User: `GET api/v1/user/me`
#### Books
-  Get all Available books: `GET api/v1/books/`
-  Get book by id: `GET api/v1/books/:bookId`
-  Post a new book (admin only): `POST api/v1/books/`
-  Update a new book (admin only): `PUT api/v1/books/:bookId`
-  Delete a new book (admin only): `DELETE api/v1/books/:bookId`
#### Transaction
-  Borrow Book: `POST api/v1/transactions/borrow/:bookId`
-  Return Book: `POST api/v1/transactions/return/:bookId`
#### Healthcheck
-  Healthcheck server: `POST api/v1/health-check/`
-  Healthcheck protected route: `POST api/v1/health-check/protected`
-  Healthcheck admin only route: `POST api/v1/health-check/admin`


## Middlewares
####  Authentication Middleware:
- `verifyJwt` : Protects routes by verifying JWT tokens.
- `adminOnly` : Protects admin only routes



## Error Handling and Api Response

This application includes a robust error-handling system and custom response handling to ensure consistency and clarity in API responses.
- Error Handling: The `ApiError` utility class is used for creating custom errors with specific HTTP statuses and messages. Any API error that occurs will be thrown as an `ApiError` instance and caught by the error handler, which then sends a standardized JSON response with the error code and message.
- Custom API Response: All successful responses are wrapped in the `ApiResponse` class to maintain a consistent structure. Each response includes an HTTP status code, a data payload (if applicable), and a message, ensuring all client responses follow the same structure.

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://anmolgoyal.me/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anmol-goyal-358804235/)
[![twitter](https://img.shields.io/badge/github-010101?style=for-the-badge&logo=github&logoColor=white)](https://anmolgoyal.me/_next/static/media/github-icon.04fa7de0.svg)

