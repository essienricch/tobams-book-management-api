# Tobams Book Management API Documentation

## Overview
This project is a simple CRUD API built with Node.js, Express.js, and TypeScript for managing a collection of books. It includes endpoints for creating, reading, updating, and deleting book records, as well as for uploading and updating book cover images.

## Features
- Create, Read, Update, Delete (CRUD) operations for book management.
- File upload middleware for handling book cover images (Be Informed: The uploaded image must not exceed 2MB).
- Comprehensive error handling and input validation.
- Built using TypeScript for type safety.
- MongoDB for data storage.
- Jest test & Supertest Test framework.
- Postman tests for API validation.

## Project Setup and Installation Instructions ##

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local instance or cloud service like MongoDB Atlas: https://cloud.mongodb.com/user/register)
- Typescript
- Multer Dependencies 
- Git as version control.

### Installation Steps
1. **Clone the repository:**
    ```
   git clone https://github.com/essienricch/tobams-book-management-api 
   
   cd tobams-book-management-api
   ```

2. **Install dependencies:**
   ```
    npm install
   ```

3. **Create a .env file in the root directory and configure the environment variables:**
   ```
    MONGODB_URL=your database url
    PORT=your local port
   ```

4. **Build the application (optional, if you need to compile TypeScript):**
   ```
    npm run build
   ```
5. **Run the application:**
   ```
    npm run dev
   ```

6. **Run Test using Postman or Jest Test:**

   
   Create Requests using the API Endpoint on Postman
   
   
   Using Jest Test Framework
   
   ```
    npm test
   ```

##  Description of the API endpoints and their expected requests/response. ##

Base URL - localhost:{PORT}/tobams-store/api
### Create a Book  
This API creates a book, validates the input data & save to DB
- Endpoint: POST ' /book '
  
  Request Body:
```
{
    "title": "Fire & Ice",
    "author": "Martins Gerard",
    "publishedDate": "2023-05-10",
    "isbn": "12345"
}
```
 Response:
```
{
  title: 'Fire & Ice',
  author: 'Martins Gerard',
  publishedDate: 2023-05-10T00:00:00.000Z,
  isbn: '12345',
  _id: new ObjectId('66abe3123c462a879946ad39')
}
```
### Update a Book  
This API Update the details of the book with the specified ID based on the request body ( which could contain the request file for cover-image update) .i.e. this service also serves the cover-image update function. ( Using Postman, you can make use of the form-data for the update)
- Endpoint: PATCH ' /book/update/66abe3123c462a879946ad39 '
  
  Request Body:
```
{
    "publishedDate": "2024-05-10",
    "coverImage": "Dragon Stone"
}
```
 Response:
```
{
  title: 'Fire & Ice',
  author: 'Martins Gerard',
  publishedDate: 2024-05-10T00:00:00.000Z,
  isbn: '12345',
  coverImage: 'Dragon Stone',
  _id: new ObjectId('66abe3123c462a879946ad39')
}
```
### Get all Books  
This API Returns a structured response containing a list of all books in the collection
- Endpoint: GET  ' /book '
  
 Response:
```
Books: [
{
  title: 'Fire & Ice',
  author: 'Martins Gerard',
  publishedDate: 2023-05-10T00:00:00.000Z,
  isbn: '12345',
  _id: new ObjectId('66abe3123c462a879946ad39')
}
{
  title: 'Tales By Moonlight',
  author: 'Jaja IV Opobo',
  publishedDate: 1990-11-05T00:00:00.000Z,
  isbn: '15342',
  _id: new ObjectId('866cbe3123c462a879946ad42')
}
]

```
### Get a Single Book By ID  
This API returns the details of the book with the specified ID, Also handle the case where the book ID does not exist
- Endpoint: GET ' /book/66abe3123c462a879946ad39 '

  Response:
```
{
  title: 'Fire & Ice',
  author: 'Martins Gerard',
  publishedDate: 2024-05-10T00:00:00.000Z,
  isbn: '12345',
  coverImage: 'Dragon Stone',
  _id: new ObjectId('66abe3123c462a879946ad39')
}
```
### Delete a Single Book By ID  
This API deletes the book with the specified ID, Also handle the case where the book ID does not exist
- Endpoint: DELETE ' /book/66abe3123c462a879946ad39 '

  Response:
```
{
  "message": "Book deleted successfully."
}
```
## How to Run the Application and Test the Endpoints ##  
1. **Run the application locally:**
   - Ensure Mongo DB is connected and running
   - Run `npm run dev` to start the server on the configured port (default: 2024).

2. **Test the Endpoints using Jest, Supertest unit test or Postman:**
   - Run the test using `npm test`
   - Manually create requests using the API endpoints provided above
   - For file uploads, use the form-data option in postman 

  



