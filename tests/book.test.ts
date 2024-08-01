import request from 'supertest';
const app = require('../app');
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
const dotenv = require("dotenv");
const Book = require('../src/models/book');

dotenv.config();

describe('Book API', () => {
  let createdBookId: string;

  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://essienricch:villain@cluster1.maqrp6h.mongodb.net/tobamsbookstore?retryWrites=true&w=majority&appName=Cluster1');
  });


  
  // beforeEach(async () => {
    //   await Book.deleteMany({});
    // });
    
    beforeEach(async () => {
      const bookData = {
        title: 'Test Book',
        author: 'Test Author',
        publishedDate: new Date(),
        isbn: '1234567890',
      };
      
      const book = new Book(bookData);
      await book.save();
      createdBookId = book._id;
    });
    
    test.only('should create a new book(increased timeout)', async () => {
      const res = await request(app)
      .post('/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        publishedDate: '2023-01-01',
        ISBN: '1234567890'
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      createdBookId = res.body._id;
    }, 10000);
  })
  afterAll(async () => {
    await closeConnection();
  });
  
async function closeConnection() {
  await mongoose.connection.close();
}

//   it('should get all books', async () => {
//     // First, create a book
//     await request(app)
//       .post('/books')
//       .send({
//         title: 'Test Book',
//         author: 'Test Author',
//         publishedDate: '2023-01-01',
//         ISBN: '1234567890'
//       });

//     const res = await request(app).get('/books');
//     expect(res.statusCode).toEqual(200);
//     expect(Array.isArray(res.body)).toBeTruthy();
//     expect(res.body.length).toBeGreaterThan(0);
//   });

//   it('should get a single book', async () => {
//     // First, create a book
//     const createRes = await request(app)
//       .post('/books')
//       .send({
//         title: 'Test Book',
//         author: 'Test Author',
//         publishedDate: '2023-01-01',
//         ISBN: '1234567890'
//       });
    
//     const bookId = createRes.body._id;

//     const res = await request(app).get(`/books/${bookId}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('_id', bookId);
//   });

//   it('should update a book', async () => {
//     // First, create a book
//     const createRes = await request(app)
//       .post('/books')
//       .send({
//         title: 'Test Book',
//         author: 'Test Author',
//         publishedDate: '2023-01-01',
//         ISBN: '1234567890'
//       });
    
//     const bookId = createRes.body._id;

//     const res = await request(app)
//       .put(`/books/${bookId}`)
//       .send({
//         title: 'Updated Test Book',
//         author: 'Updated Test Author',
//         publishedDate: '2023-02-01',
//         ISBN: '0987654321'
//       });
    
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('title', 'Updated Test Book');
//   });

//   it('should delete a book', async () => {
//     // First, create a book
//     const createRes = await request(app)
//       .post('/books')
//       .send({
//         title: 'Test Book',
//         author: 'Test Author',
//         publishedDate: '2023-01-01',
//         ISBN: '1234567890'
//       });
    
//     const bookId = createRes.body._id;

//     const res = await request(app).delete(`/books/${bookId}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('message', 'Book deleted successfully');

//     // Verify the book is actually deleted
//     const getRes = await request(app).get(`/books/${bookId}`);
//     expect(getRes.statusCode).toEqual(404);
//   });

//   it('should update book cover image', async () => {
//     // First, create a book
//     const createRes = await request(app)
//       .post('/books')
//       .send({
//         title: 'Test Book',
//         author: 'Test Author',
//         publishedDate: '2023-01-01',
//         ISBN: '1234567890'
//       });
    
//     const bookId = createRes.body._id;

//     // Create a temporary image file for testing
//     const tempImagePath = path.join(__dirname, 'test-image.jpg');
//     fs.writeFileSync(tempImagePath, 'dummy image content');

//     const res = await request(app)
//       .patch(`/books/cover-image/${bookId}`)
//       .attach('coverImage', tempImagePath);
    
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('coverImage');
//     expect(res.body.coverImage).toBeTruthy();

//     // Clean up the temporary file
//     fs.unlinkSync(tempImagePath);
//   });

//   it('should return 404 for non-existent book', async () => {
//     const nonExistentId = new mongoose.Types.ObjectId();
//     const res = await request(app).get(`/books/${nonExistentId}`);
//     expect(res.statusCode).toEqual(404);
//   });

//   it('should handle invalid book data', async () => {
//     const res = await request(app)
//       .post('/books')
//       .send({
//         // Missing required fields
//         title: 'Test Book'
//       });
//     expect(res.statusCode).toEqual(400);
//   });
// });