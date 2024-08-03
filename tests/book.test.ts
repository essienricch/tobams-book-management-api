import request from 'supertest';
const app = require('../app');
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { url } from 'inspector';
const Book = require('../src/models/book');
const {connectDB, closeConnection} = require('../src/config/db')

dotenv.config();

describe('Book API', () => {
  let createdBookId: string;
  const url = '/tobams-store/api/book'

  beforeAll(async () => {
    await connectDB();
    await Book.deleteMany({})
  }, 120000);

  
    test.only('should create a new book(increased timeout)', async () => {
      const uniqueISBN = `ISBN-${Date.now()}`;
      const res = await request(app)
      .post(url)
      .send({
        title: 'Test Book',
        author: 'Test Author',
        publishedDate: '2023-01-01',
        isbn: uniqueISBN
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      createdBookId = res.body._id;
    }, 20000);
  

 
  beforeEach(async () => {
    await Book.deleteMany({})
    await Book.create({
        title: 'Sample Book',
        author: 'Sample Author',
        publishedDate: '2023-01-01',
        isbn: `ISBN-${Date.now()}`
    });
  });
  


  test.only('should get all books', async () => {
  
      const res = await request(app).get('/tobams-store/api/book');
      console.log('Response status:', res.statusCode);
      console.log('Response body:', res.body);
      expect(res.statusCode).toEqual(200);  
    },30000);



  test.only('should get a single book', async () => {
    const createRes = await request(app)
      .post('/tobams-store/api/book')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        publishedDate: '2023-01-01',
        isbn: '123456'
      });
    
    const bookId = createRes.body._id;

    const res = await request(app).get(`/tobams-store/api/book/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', bookId);
  });



  test.only('should update a book', async () => {
    // First, create a book
    const createRes = await request(app)
      .post('/tobams-store/api/book')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        publishedDate: '2023-01-01',
        isbn: '1234567890'
      });
    
    const bookId = createRes.body._id;

    const res = await request(app)
      .patch(`/tobams-store/api/book/update/${bookId}`)
      .send({
        title: 'Updated Test Book',
        author: 'Updated Test Author',
        publishedDate: '2023-02-01',
        isbn: '0987654321'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Book');
  });



  test.only('should delete a book', async () => {
    // First, create a book
    const createRes = await request(app)
      .post('/tobams-store/api/book')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        publishedDate: '2023-01-01',
        isbn: '1234567890'
      });
    
    const bookId = createRes.body._id;

    const res = await request(app).delete(`/tobams-store/api/book/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Book deleted successfully');

    // Verify the book is actually deleted
    const getRes = await request(app).get(`/tobams-store/api/book/${bookId}`);
    expect(getRes.statusCode).toEqual(404);
  });

  afterAll(async () => {
    await Book.deleteMany({})
    await closeConnection();
  });
})

