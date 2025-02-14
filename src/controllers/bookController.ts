import { Request, Response } from 'express';
const Book = require('../models/book');
const Utils = require('../utils');


//CREATE A BOOK ==>
const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, publishedDate, isbn } = req.body;
    const book = new Book({ title, author, publishedDate, isbn });
    console.log(book);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    Utils.handleError(error, res);
  }
};

//UPDATE BOOK ==>
const updateBook = async (req: Request, res: Response) => {
    let imageLimit= 2097152;
    try {
        const image = req.file?.filename
        const updatedBookData: any = {...req.body}
        if(req.file){
            if(req.file.size > imageLimit){
                console.log("file size limit exceeded")
                return res.status(413).json({ message: 'File size exceeds limit (2MB)' });
            }
            updatedBookData.coverImage = image;
        }
      const book = await Book.findByIdAndUpdate(req.params.id, updatedBookData,{new: true});
      if (!book) {
        console.log('Book not found');
        return res.status(404).json({ message: 'Book not found' });
      }
      await book.save();
      console.log({Updated_Book: book});
      res.status(200).json(book);
    } catch (error) {
      Utils.handleError(error, res);
    }
};

//GET ALL BOOKS ==>
const getAllBooks = async (req: Request, res: Response) => {
    try {
      const books = await Book.find({});
      console.log({Books: books})
      res.status(200).json({Books: books});
    } catch (error) {
      Utils.handleError(error, res);
    }
};

//GET BOOK BY ID ==>
const getBookById = async (req: Request, res: Response) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      Utils.handleError(error, res);
    }
};

//DELETE BOOK BY ID ==>
const deleteBook = async (req: Request, res: Response) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      Utils.handleError(error, res);
    }
};

module.exports = {createBook, updateBook, getAllBooks, getBookById, deleteBook};
  
