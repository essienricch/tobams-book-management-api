# Tobams Book Management API Documentation

## Overview
This project is a simple CRUD API built with Node.js, Express.js, and TypeScript for managing a collection of books. It includes endpoints for creating, reading, updating, and deleting book records, as well as for uploading and updating book cover images.

## Features
- Create, Read, Update, Delete (CRUD) operations for book management.
- File upload middleware for handling book cover images.
- Comprehensive error handling and input validation.
- Built using TypeScript for type safety.
- MongoDB for data storage.
- Jest test & Supertest Test framework.
- Postman tests for API validation.

## Project Setup and Installation Instructions ##

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local instance or cloud service like MongoDB Atlas)
- Typescript
- Multer Dependencies 
- Git as version control.

### Installation Steps
1. **Clone the repository:**\n
   git clone https://github.com/essienricch/tobams-book-management-api \n
   cd tobams-book-management-api

2. **Install dependencies:**
    npm install

3. **Create a .env file in the root directory and configure the environment variables:**
    MONGODB_URL=your database url
    PORT=your local port

4. **Build the application (optional, if you need to compile TypeScript):**
    npm run build

5. **Run the application:**
    npm start or npm run dev

6. **Run Test using Postman or Jest Test:**
    Postman => Import the Postman collection using this url: [text](<../../../Desktop/Tobams Book Store API.postman_collection.json>)
    Jest => npm test


##  Description of the API endpoints and their expected inputs/outputs. ##



