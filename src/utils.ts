import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
const Book = require('../src/models/book');

interface IValidationErrors {
  [key: string]: string;
}

const validateInput = (requiredFields: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  const errors: IValidationErrors = {};

    requiredFields.forEach(field => {
    if (!req.body[field]) {
      errors[field] = `The ${field} field is required`;
    }
  });

  
  if (Object.keys(errors).length === 0) {
    
    const book = req.body.constructor; 
    const uniqueField = 'isbn'; 

    if (req.body[uniqueField]) {
      const existingRecord = await Book.findOne({ [uniqueField]: req.body[uniqueField] });
      if (existingRecord) {
        errors[uniqueField] = `${uniqueField} already exists`;
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};



const handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
};

module.exports = {
  validateInput,  
  handleError
}